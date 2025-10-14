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
Expand the given query by adding relevant terms, supplements, and related scientific keywords separated by a vertical bar (|).
Rules:
- Use concise terms (1–3 words)
- Include related concepts, supplement names, and physiological terms if relevant
- Return only the expanded keywords — no explanations or sentences.

Example:
Input: what are the side effects of supplements ?
Output: side effects | supplement safety | creatine | whey protein | BCAA | caffeine | beta alanine | pre workout

Query : ${query}
      `,
    });
    return response.text || "no response.. :(";
  } catch (e) {
    throw new Error(`error in query expansion ${(e as Error).message}`);
  }
};
