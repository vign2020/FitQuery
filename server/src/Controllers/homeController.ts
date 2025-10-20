import { Request, Response } from "express";
import { createEmbeddingService } from "../Services/createEmbeddigService";
import { insertionService } from "../Services/insertionService";
import { queryService } from "../Services/queryService";
import { I_textChunks } from "../Types/types";
import { questionAnsweringService } from "../Services/questionAnsweringService";
import research_data from "../data/data.json";
import old_data from "../data/data_old.json";
import { QueryExpansion } from "../Services/queryExpansion";
import { dataIngestion } from "../Services/dataIngestion";
import { topics } from "../data/topics";
import { writeFile } from "fs/promises";

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
    // expand the query for better context
    const expanded = await QueryExpansion(query);
    console.log("This is the expanded query " + expanded);
    //send this query to the fetchTranscriptService;
    const embeddings = await createEmbeddingService(expanded);
    const results = await queryService(expanded, embeddings);

    const abstract_context = results?.matches.map((item: I_textChunks) => {
      return item.metadata.abstract;
    });

    console.log("ABSTRACT CONTEXT " + abstract_context);

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

export const GET_data_ingestion = async (req: Request, res: Response) => {
  try {
    const newRes: any[] = [];

    for (const item of topics) {
      // Call your ingestion function
      const content = await dataIngestion(item.title);

      const filename = `${item.title}.json`;

      console.log(
        "file name " + filename + " and  content " + JSON.stringify(content)
      );
      await writeFile(filename, content, "utf8");

      newRes.push(content);

      // Wait 2 seconds before next iteration
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    res.status(200).send({ ingest: newRes });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e });
  }
};
