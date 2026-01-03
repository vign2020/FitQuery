import { Index, RecordMetadata } from "@pinecone-database/pinecone";
import { I_insert_shape, I_insert_shape_array } from "../Types/types";

//service for obtaining the best match for the given query based on vector similarity.
export const queryService = async (
  query: string,
  embeddings: number[],
  filter_namespace: Index<RecordMetadata>
): Promise<I_insert_shape_array> => {
  try {
    const answers: any = await filter_namespace.query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });

    return answers;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
