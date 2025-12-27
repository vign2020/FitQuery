import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const QueryExpansion = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
      You are a helpful assistant for expanding academic fitness and nutrition research queries.
Expand the given query by adding relevant terms, supplements, and related scientific keywords separated by a space.
Rules:

- Include related concepts , jargons , supplement names, and physiological terms if relevant
- Return only the expanded keywords — no explanations or sentences.
- Don't exceed more than 10 terms.
- If query is unrelated to the topic, ignore it.

Example:
Input: what are the side effects of supplements ?
Output: side effects | supplement | safety creatine | whey protein | BCAA | caffeine | beta alanine | pre workout

Query : ${query}
      `,
    });
    return response.text || "no response.. :(";
  } catch (e) {
    throw new Error(`error in query expansion ${(e as Error).message}`);
  }
};
