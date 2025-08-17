import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const questionAnsweringService = async (
  chunks: string[],
  question: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are a helpful assistant. Use the following array of contexts to answer the question accurately.
If the answer cannot be found in the context, say "I don't know".

Context:
    ${chunks}

Question: ${question} 
      `,
    });
    return response.text || "no response.. :(";
  } catch (e) {
    throw new Error((e as Error).message);
  }
};
// await main();
