import { Index, RecordMetadata } from "@pinecone-database/pinecone";

//service for obtaining the best match for the given query based on vector similarity.
export const queryService = async (
  query: string,
  embeddings: number[],
  filter_namespace: Index<RecordMetadata>
) => {
  try {
    const answers: any = await filter_namespace.query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });
    console.log("qauerying finished ... ");

    return answers;
  } catch (e) {
    console.log("error in querying.." + e);
  }
};
