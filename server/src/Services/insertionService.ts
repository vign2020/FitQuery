/** @format */

import { Pinecone } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";
import { I_research_chunk } from "../Types/types";
import { namespace_misc } from "../Models/PineCone";

//inserting the title and abstract of the research paper into pinecone db . This service also inserts the embeddings obtained from the gemini api

dotenv.config();
const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) {
  throw new Error("Missing PINECONE_API_KEY in environment variables");
}

export const pc = new Pinecone({
  apiKey: apiKey,
});

export const insertionService = async (
  chunks: I_research_chunk[],
): Promise<string> => {
  try {
    // let records: any[] = [];

    chunks.forEach(async (chunk) => {
      // let records: any[] =
      let insert = [
        {
          id: `${chunk.id?.toString()}`,
          values: chunk.embedding,
          metadata: {
            // title: chunk.title,
            abstract: chunk.abstract,
          },
        },
      ];

      if (chunk.namespace_name) {
        await chunk.namespace_name.upsert(insert);

        // records.push(insert);
      } else {
        await namespace_misc.upsert(insert);
      }
    });

    // if (records.length) await namespace_insert.upsert(records);
    // if (no_namespace_name.length)
    //   await namespace_insert.upsert(no_namespace_name);

    return `Inserted ${chunks.length} records into Pinecone`;
  } catch (e) {
    throw new Error(`Error in insertion service : ${(e as Error).message}`);
  }
};
