import { Request, Response } from "express";
import { createEmbeddingService } from "../Services/createEmbeddigService";
import { insertionService } from "../Services/insertionService";
import { queryService } from "../Services/queryService";
import { I_textChunks } from "../Types/types";
import { questionAnsweringService } from "../Services/questionAnsweringService";
import research_data from "../data/data.json";

export const GET_Chunks = async (req: Request, res: Response) => {
  try {
    const embedding_result = await Promise.all(
      research_data.data.map(async (item, idx) => {
        const embedding = await createEmbeddingService(item.abstract);
        return {
          _id: idx,
          title: item.title,
          embedding: embedding,
          abstract: item.abstract,
        };
      })
    );
    //insert into the pincone db
    console.log("created embeddings .. now inserting .. ");

    const send_embeddings: string = await insertionService(embedding_result);

    res.status(200).send({ send_embeddings });
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

    const abstract_context = results?.matches.map((item: I_textChunks) => {
      return item.metadata.abstract;
    });

    console.log(abstract_context.length);

    console.log("abstract_context " + abstract_context);
    // // Generation part of getting the answers from gemini.
    console.log("Searching gemini for answer.....");
    const geminiAnswer: string = await questionAnsweringService(
      abstract_context,
      query
    );

    res.status(200).send({ geminiAnswer });
  } catch (error) {}
};
