import { Pinecone } from "@pinecone-database/pinecone";
import { I_insertionData } from "../Types/types";

export const pc = new Pinecone({
  apiKey:
    "pcsk_ioxkP_QZchKUAfpdCcST7BRgTNMKCtQdtHJR12wpHbrrctxja6X3DEuwUwhUbjYUXbkWL",
});

export const namespace = pc
  .index(
    "yt-semantic-search",
    "https://yt-semantic-search-okuppnk.svc.aped-4627-b74a.pinecone.io"
  )
  .namespace("namespace-one");

export const insertionService = async (chunks: any, title: string) => {
  try {
    const records = chunks.map((chunk: any, index: number) => ({
      id: `${chunk._id.toString()}-${index}`,
      values: chunk.embedding,
      metadata: {
        text: chunk.chunk_text, // Match the 'text' field mapping in your index
        title: chunk.title,
      },
    }));

    await namespace.upsert(records);
    console.log(`Inserted ${records.length} records into Pinecone`);
  } catch (e) {
    console.log("pinecone error", e);
  }
};
