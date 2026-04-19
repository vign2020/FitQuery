/** @format */

import { GoogleGenAI } from "@google/genai";

import * as dotenv from "dotenv";

dotenv.config();
const apiKey = process.env.GEMINI_API_KEY;
//creates embeddings for the given chunk using google gemini api

export const createEmbeddingService = async (chunk: string) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });

    const response: any = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: chunk,
      config: {
        outputDimensionality: 768,
      },
    });

    return response?.embeddings[0].values;
  } catch (e) {
    throw new Error(`createEmbeddingService ${(e as Error).message}`);
  }
};
