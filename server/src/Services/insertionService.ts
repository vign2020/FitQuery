import { Pinecone } from "@pinecone-database/pinecone";
import { I_research_chunk } from "../Types/types";
import * as dotenv from "dotenv";
import { namespaceMap } from "../utility/namespacemap";

//inserting the title and abstract of the research paper into pinecone db . This service also inserts the embeddings obtained from the gemini api

dotenv.config();
const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) {
  throw new Error("Missing PINECONE_API_KEY in environment variables");
}

export const pc = new Pinecone({
  apiKey: apiKey,
});

// export const namespace_one = pc
//   .index(
//     "yt-semantic-search",
//     "https://yt-semantic-search-okuppnk.svc.aped-4627-b74a.pinecone.io"
//   )
//   .namespace(`namespace-one`);

export const namespace_two = pc
  .index(
    "yt-semantic-search",
    "https://yt-semantic-search-okuppnk.svc.aped-4627-b74a.pinecone.io"
  )
  .namespace(`namespace-two`);

export const namespace_three = pc
  .index(
    "yt-semantic-search",
    "https://yt-semantic-search-okuppnk.svc.aped-4627-b74a.pinecone.io"
  )
  .namespace(`namespace-three`);

export const namespace_four = pc
  .index(
    "yt-semantic-search",
    "https://yt-semantic-search-okuppnk.svc.aped-4627-b74a.pinecone.io"
  )
  .namespace(`namespace-four`);

export const namespace_five = pc
  .index(
    "yt-semantic-search",
    "https://yt-semantic-search-okuppnk.svc.aped-4627-b74a.pinecone.io"
  )
  .namespace(`namespace-five`);

export const namespace_misc = pc
  .index(
    "yt-semantic-search",
    "https://yt-semantic-search-okuppnk.svc.aped-4627-b74a.pinecone.io"
  )
  .namespace(`namespace-misc`);

export const insertionService = async (
  chunks: I_research_chunk[]
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

    // console.log("namespace name is " + namespace_insert);
    // if (records.length) await namespace_insert.upsert(records);
    // if (no_namespace_name.length)
    //   await namespace_insert.upsert(no_namespace_name);

    return `Inserted ${chunks.length} records into Pinecone`;
  } catch (e) {
    throw new Error(`Error in insertion service : ${(e as Error).message}`);
  }
};
