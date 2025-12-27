import data from "../data/namespace_embeddings.json";

import {
  namespace_five,
  namespace_four,
  namespace_three,
  namespace_two,
} from "../Services/insertionService";
import { Index, RecordMetadata } from "@pinecone-database/pinecone";
import { cosineSimilarity } from "./cosinesimilarity";

export const identifynamespace = async (
  embeddings: number[]
): Promise<Index<RecordMetadata>> => {
  //cosine similarity
  let namespace_max: Index<RecordMetadata> = namespace_two;
  let max_score = -100;

  const score1 = cosineSimilarity(embeddings, data.namespace_two_embeddings);
  const score2 = cosineSimilarity(embeddings, data.namespace_three_embeddings);
  const score3 = cosineSimilarity(embeddings, data.namespace_four_embeddings);
  const score4 = cosineSimilarity(embeddings, data.namespace_five_embeddings);

  const arr = [
    { score: score1, name: namespace_two },
    { score: score2, name: namespace_three },
    { score: score3, name: namespace_four },
    { score: score4, name: namespace_five },
  ];
  arr.map((item, _) => {
    if (item.score > max_score) {
      max_score = item.score;
      namespace_max = item.name;
    }
  });

  return namespace_max;
};
