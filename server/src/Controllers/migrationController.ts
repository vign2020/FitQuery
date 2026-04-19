/** @format */

import { Pinecone } from "@pinecone-database/pinecone";
import { Request, Response } from "express";
import { createEmbeddingService } from "../Services/createEmbeddigService";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

const NEW_INDEX_NAME = process.env.NEW_INDEX_NAME || "fit-query-v2";
const OLD_INDEX_NAME = process.env.OLD_INDEX_NAME || "yt-semantic-search";
const old_index = pc.index(OLD_INDEX_NAME);
const new_index = pc.index(NEW_INDEX_NAME);

export const POST_migrationController = async (req: Request, res: Response) => {
  try {
    const stats = await old_index.describeIndexStats();
    const namespace_names_string = Object.keys(stats.namespaces ?? {});

    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    await Promise.all(
      namespace_names_string.map(async (namespace_name, _) => {
        const ns = old_index.namespace(namespace_name);
        const new_ns = new_index.namespace(namespace_name);

        const allIds: any[] = [];
        let paginationToken: string | undefined = undefined;

        do {
          const response = await ns.listPaginated({ paginationToken });
          const ids = response.vectors?.map((v) => v.id) ?? [];
          if (ids) allIds.push(...ids);
          paginationToken = response.pagination?.next;
        } while (paginationToken);

        const BATCH_SIZE = 100;
        for (let i = 0; i < allIds.length; i += BATCH_SIZE) {
          const batchIds = allIds.slice(i, i + BATCH_SIZE);
          const fetchResponse = await ns.fetch(batchIds);

          for (const record of Object.values(fetchResponse.records)) {
            const abstract = record.metadata?.abstract as string;
            const id = record.id;

            if (abstract && typeof abstract === "string" && id) {
              const embedding_values = await createEmbeddingService(abstract);

              await new_ns.upsert([
                {
                  id: id,
                  values: embedding_values,
                  metadata: { abstract },
                },
              ]);
            }
          }

          //  delay after each batch
          if (i + BATCH_SIZE < allIds.length) {
            console.log("now sleeping for a while 😴😴😴");
            await sleep(3000);
          }
        }
      }),
    );

    res.status(200).json({ stats: stats });
  } catch (e) {
    res
      .status(500)
      .json({ message: `Migration failed ${(e as Error).message}` });
  }
};
