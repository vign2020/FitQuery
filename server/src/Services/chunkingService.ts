import { I_ChunksEmbeddings } from "../Types/types";
import { createEmbeddingService } from "./createEmbeddigService";

const batchSize = 2;
const delay = 1000;
const sleep = (ms: number | undefined) =>
  new Promise((res) => setTimeout(res, ms));

export const chunkingService = async (all_data: string) => {
  try {
    const results = [];
    const chunks = all_data.split(/\n+/);
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);

      const batchResults = await Promise.all(
        batch.map(async (chunk: string, idx: number) => {
          const embeddings = await createEmbeddingService(chunk);

          return { _id: idx, chunk_text: chunk, embedding: embeddings };
        })
      );
      results.push(...batchResults);
      await sleep(delay);
    }
    console.log("results length is " + results.length);
    return results;
  } catch (e) {
    console.log("error is " + e);
  }
};
