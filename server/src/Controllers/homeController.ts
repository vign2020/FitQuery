import { Request, Response } from "express";
import { createEmbeddingService } from "../Services/createEmbeddigService";
import { insertionService } from "../Services/insertionService";
import { queryService } from "../Services/queryService";
import { I_textChunks } from "../Types/types";
import { questionAnsweringService } from "../Services/questionAnsweringService";
import research_data from "../data/data.json";
import old_data from "../data/data_old.json";
import { QueryExpansion } from "../Services/queryExpansion";

export const GET_Chunks = async (req: Request, res: Response) => {
  try {
    const sizeOfdata = old_data.data.length;

    const embedding_result = await Promise.all(
      research_data.data.map(async (item, idx) => {
        const embedding = await createEmbeddingService(item.abstract);
        return {
          _id: idx + sizeOfdata,
          title: item.title,
          embedding: embedding,
          abstract: item.abstract,
        };
      })
    );

    const send_embeddings: string = await insertionService(embedding_result);

    res.status(200).send({ message: send_embeddings });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

export const POST_query = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    //expand the query for better context
    const expanded = await QueryExpansion(query);
    console.log("This is the expanded query " + expanded);
    //send this query to the fetchTranscriptService;
    const embeddings = await createEmbeddingService(expanded);
    const results = await queryService(expanded, embeddings);

    const abstract_context = results?.matches.map((item: I_textChunks) => {
      return item.metadata.abstract;
    });

    const geminiAnswer: string = await questionAnsweringService(
      abstract_context,
      query
    );

    res.status(200).send({ geminiAnswer: geminiAnswer });

    // res.status(200).send({ expanded: expanded });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
};
