import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
//The question and answer service . Uses gemini-2.5-flash

export const questionAnsweringService = async (
  chunks: string[],
  question: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are a helpful assistant. Use the following array of contexts to answer the question. Make the answer more elaborate and not a one liner.Also mention the name of the research paper and the author which can be found in the first line of the context.
If the answer cannot be found in the context, say "Sorry, I can only assist you with questions related to diet and exercise science :( . If the question is related but too generic like "how to bench press" then give your own answer ".

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
