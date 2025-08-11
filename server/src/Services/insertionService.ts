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
    const insert_chunks = chunks.map((item: any, idx: number) => {
      return {
        id: String(item._id || idx),
        values: item.embedding,
        metadata: {
          title: title,
          chunk_data: item.chunk_text,
        },
      };
    });
    await namespace.upsertRecords(insert_chunks);
    console.log(
      "successfully inserted " + insert_chunks.length + " records into pinecone"
    );
  } catch (e) {
    console.log("pinecone error " + e);
  }
};
