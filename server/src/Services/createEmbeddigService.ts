import { GoogleGenAI } from "@google/genai";

export const createEmbeddingService = async (chunk: string) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: "AIzaSyB23jHSPToot7tI0EKqGi_mGLYBol2wO-s",
    });
    // gemini-embedding-exp-03-07
    const response: any = await ai.models.embedContent({
      model: "models/embedding-001",
      contents: chunk,
    });

    // console.log(response.embeddings);
    return response?.embeddings[0].values;
  } catch (e) {}
};
