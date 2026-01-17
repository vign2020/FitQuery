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
      contents: `You are a knowledgeable assistant specialized in exercise science and fitness research.

Use the following array of research paper contexts to answer the users question.

Guidelines:
1. The answer does NOT need to be explicitly stated in a single sentence in the context.
   - You may infer, synthesize, or reason using related findings, such as biomechanics, joint angles, muscle activation, or training outcomes mentioned in the papers.
   - Combine evidence from multiple contexts if needed.

2. When citing research:
   - Use ONLY the paper title and author(s) provided in the FIRST line of each context.
   - Highlight the paper title and author(s) by wrapping them in <mark>...</mark>.
   - Do NOT invent or guess paper names or authors.

3. Answer style:
   - Provide a clear, well-structured, and elaborate explanation (not a one-line answer).
   - Explain *why* the research supports the conclusion, not just *what* it says.

4. If the question is not directly answered but closely related:
   - Say:
     "Our database currently does not have research papers that directly answer this question, but the following closely related studies provide useful insights."
   - Then explain how those studies relate to the question and what can be reasonably inferred from them.

5. If the question is related to exercise science but is too generic (e.g., "how to bench press"):
   - Provide a concise, evidence-informed explanation based on general exercise science principles.

6. If the question is completely outside the domain of diet and exercise science:
   - Respond with:
     "Sorry, I can only assist you with questions related to diet and exercise science :(."

Important:
- Base all scientific claims on the provided contexts or well-established exercise science principles.
- Do not hallucinate research findings.
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
