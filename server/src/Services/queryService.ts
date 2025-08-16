import { namespace } from "./insertionService";

export const queryService = async (query: string, embeddings: number[]) => {
  try {
    const answers = await namespace.query({ topK: 3, vector: embeddings });

    return answers;
  } catch (e) {
    console.log("error in querying.." + e);
  }
};
