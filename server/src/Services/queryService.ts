import { namespace } from "./insertionService";

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
