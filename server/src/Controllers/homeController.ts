/** @format */

import { NextFunction, Request, Response } from "express";
import { createEmbeddingService } from "../Services/createEmbeddigService";
import { insertionService } from "../Services/insertionService";

import { queryService } from "../Services/queryService";
import {
  I_insert_shape,
  I_PaperContent,
  I_records_details,
} from "../Types/types";
import { questionAnsweringService } from "../Services/questionAnsweringService";
import { QueryExpansion } from "../Services/queryExpansion";
import { dataIngestion } from "../Services/dataIngestion";
import { topics_insert } from "../utility/topicsinsert";
import { identifynamespace } from "../utility/identifynamespace";
import { namespaceMap } from "../utility/namespacemap";

export const POST_query = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { query } = req.body;

    // EXPAND THE QUERY FOR BETTER CONTEXT
    // const expanded = await QueryExpansion(query);
    const expanded = query;

    console.log("expanded query is  ", expanded);

    // CREATE EMBEDDINGS FOR THE EXPANDED QUERY
    const embeddings = await createEmbeddingService(expanded);

    //NAMESPACE IDENTIFICATION . FINDING THE BEST ONE OUT OF THE 5 (AT THIS POINT DO SPARSE SEARCH BM25)
    const filter_namespace = await identifynamespace(embeddings);

    // console.log("namespace name is 🥁🥁 ", filter_namespace);

    //FINDING THE TOP K RESULTS FROM THAT PARTICULAR NAMESPACE (DENSE SEARCH)
    const results = await queryService(embeddings, filter_namespace);

    console.log("results from the query service are ", results);

    //BY DEFAULT SEARCH IN namespace_misc.

    const abstract_context = results?.matches.map((item: I_insert_shape) => {
      return item.metadata.abstract;
    });

    const geminiAnswer: string = await questionAnsweringService(
      abstract_context,
      query,
    );

    res.status(200).send({ status: true, geminiAnswer: geminiAnswer });
  } catch (error) {
    next(error);
  }
};

//cron job for data ingestion

export const GET_data_ingestion_new = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const record_details: I_records_details[] = req.body;
    // const newRes: I_PaperContent[] = [];

    const result_of_copy: I_PaperContent[] = (
      await Promise.all(
        record_details.map(async (item: I_records_details) => {
          const namespace_name_string = item.namespace_name_string;
          const title = item.title;

          //GET THE RELEVANT PAPERS FROM THE API (array of objects of size 5) ex [{} , {} , {} , .... , {}].
          const api_content = await topics_insert(title, null);

          let result_from_ingestion: I_PaperContent[] = await dataIngestion(
            api_content,
            namespace_name_string,
          );
          //now it bcomes [{ ,namespace_name_string: namespace_two}  , {...} , .. , {}]
          //  result_from_ingestion = [...result_from_ingestion , namespace_name_string]

          return result_from_ingestion;
        }),
      )
    ).flat();

    //uncomment thi if there is a need to delay between ingestion and insertion.
    // await new Promise((resolve) => setTimeout(resolve, 30000));

    // newRes will therby store all the papers for a particular namespace ie. if N1 has 5 topics and each have 3 papers then it will store 15 elements

    const insertData = await Promise.all(
      result_of_copy.map(async (item: I_PaperContent) => {
        const embeddings = await createEmbeddingService(item.abstract);

        return {
          id: item.paperId,
          abstract: item.abstract,
          embedding: embeddings,
          namespace_name: namespaceMap[item.namespace_name_string ?? ""],
          namespace_name_string: item.namespace_name_string,
        };
      }),
    );

    const insertionStatus = await insertionService(insertData);

    res.status(200).send(insertionStatus);
  } catch (error) {
    next(error);
  }
};

export const GET_health_check = async (req: Request, res: Response) => {
  try {
    res.status(200).send({ status: true, message: "Server is healthy" });
  } catch (error) {
    res.status(500).send({ status: false, message: "Server is unhealthy" });
  }
};
