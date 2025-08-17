import { Request, Response, NextFunction } from "express";
import { fetchTranscriptService } from "../Services/fetchTranscriptService";
import { createEmbeddingService } from "../Services/createEmbeddigService";
import { chunkingService } from "../Services/chunkingService";
import { preprocessingService } from "../Services/preprocessingService";
import { I_chunkingServiceData, I_ResultTranscription } from "../Types/types";
import { insertionService, namespace } from "../Services/insertionService";
import { queryService } from "../Services/queryService";
import { I_textChunks } from "../Types/types";
import { questionAnsweringService } from "../Services/questionAnsweringService";

export const GET_transcripts = async (req: Request, res: Response) => {
  try {
    const result = await fetchTranscriptService();
    //we need to do some preprocessing to the result
    const processedData: I_ResultTranscription = await preprocessingService(
      result
    );
    //This result now has to be embedded,but before that we need to do some preprocessing and split it into chunks.
    const chunks: I_chunkingServiceData[] = await chunkingService(
      processedData.textData
    );

    // console.log("insert chunks " + JSON.stringify(insert_chunks, null, 0));

    const send_embeddings: string = await insertionService(
      chunks,
      processedData.title || "no-title"
    );

    res.status(200).send({ result: send_embeddings });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

export const POST_query = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    //send this query to the fetchTranscriptService;
    const embeddings = await createEmbeddingService(query);
    const results = await queryService(query, embeddings);

    //find the exact chunks by id in pinecone
    // const chunk_ids: any = results?.matches.map((item, idx) => {
    //   return item.id;
    // });
    // const fetchResult = await namespace.fetch(chunk_ids)
    //
    const textChunks = results?.matches.map((item: I_textChunks) => {
      return item.metadata.text;
    });

    // Generation part of getting the answers from gemini.
    console.log("Searching gemini for answer.....");
    const geminiAnswer: string = await questionAnsweringService(
      textChunks,
      query
    );

    res.status(200).send({ geminiAnswer: geminiAnswer });
  } catch (error) {}
};
