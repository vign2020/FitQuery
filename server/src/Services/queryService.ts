import { namespace } from "./insertionService";

//service for obtaining the best match for the given query based on vector similarity.
export const queryService = async (query: string, embeddings: number[]) => {
  try {
    const answers: any = await namespace.query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });

    return answers;
  } catch (e) {
    console.log("error in querying.." + e);
  }
};
