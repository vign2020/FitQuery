import { Pinecone } from "@pinecone-database/pinecone";
import { I_insertionData } from "../Types/types";
import * as dotenv from "dotenv";

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
  chunks: any,
  title: string
): Promise<string> => {
  try {
    const records = chunks.map((chunk: any, index: number) => ({
      id: `${chunk._id.toString()}`,
      values: chunk.embedding,
      metadata: {
        text: chunk.chunk_text, // Match the 'text' field mapping in your index
        title: chunk.title,
      },
    }));

    await namespace.upsert(records);
    // console.log(`Inserted ${records.length} records into Pinecone`);
    return `Inserted ${records.length} records into Pinecone`;
  } catch (e) {
    // console.log("pinecone error", e);
    throw new Error((e as Error).message);
  }
};
