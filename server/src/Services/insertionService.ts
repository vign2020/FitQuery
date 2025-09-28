import { Pinecone } from "@pinecone-database/pinecone";
import { I_research_chunk } from "../Types/types";
import * as dotenv from "dotenv";

//inserting the title and abstract of the research paper into pinecone db . This service also inserts the embeddings obtained from the gemini api

dotenv.config();
const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) {
  throw new Error("Missing PINECONE_API_KEY in environment variables");
}

export const pc = new Pinecone({
  apiKey: apiKey,
});

export const namespace = pc
  .index(
    "yt-semantic-search",
    "https://yt-semantic-search-okuppnk.svc.aped-4627-b74a.pinecone.io"
  )
  .namespace(`namespace-one`);

export const insertionService = async (
  chunks: I_research_chunk[]
): Promise<string> => {
  try {
    const records = chunks.map((chunk: any, index: number) => ({
      id: `${chunk._id.toString()}`,
      values: chunk.embedding,
      metadata: {
        title: chunk.title,
        abstract: chunk.abstract,
      },
    }));

    await namespace.upsert(records);

    return `Inserted ${records.length} records into Pinecone`;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
