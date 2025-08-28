import { GoogleGenAI } from "@google/genai";

import * as dotenv from "dotenv";

dotenv.config();
const apiKey = process.env.GEMINI_API_KEY;

export const createEmbeddingService = async (chunk: string) => {
  console.log("inside the embedding service.");
  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });
    // gemini-embedding-exp-03-07
    const response: any = await ai.models.embedContent({
      model: "models/embedding-001",
      contents: chunk,
    });

    // console.log(response.embeddings);
    return response?.embeddings[0].values;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
