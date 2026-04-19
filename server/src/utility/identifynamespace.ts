/** @format */

import { Index, Pinecone, RecordMetadata } from "@pinecone-database/pinecone";
import { cosineSimilarity } from "./cosinesimilarity";
import NamespaceModel from "../Models/NamespaceModel";

const NEW_INDEX_NAME = process.env.NEW_INDEX_NAME || "fit-query-v2";
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const new_index = pc.index(NEW_INDEX_NAME);

export const identifynamespace = async (
  embeddings: number[],
): Promise<Index<RecordMetadata>> => {
  //cosine similarity
  let namespace_max = "";
  let max_score = -1000000;

  const namespaces = await NamespaceModel.find(
    {},
    { namespace_name: 1, values: 1 },
  );

  for (const namespace of namespaces) {
    const score = cosineSimilarity(embeddings, namespace.values);

    if (score > max_score) {
      max_score = score;
      namespace_max = namespace.namespace_name;
    }
  }

  return new_index.namespace(namespace_max);
};
