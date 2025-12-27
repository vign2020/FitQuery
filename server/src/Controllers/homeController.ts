import { Request, Response } from "express";
import { createEmbeddingService } from "../Services/createEmbeddigService";
import { insertionService, namespace_misc } from "../Services/insertionService";
import { queryService } from "../Services/queryService";
import { I_PaperContent, I_textChunks } from "../Types/types";
import { questionAnsweringService } from "../Services/questionAnsweringService";
import { QueryExpansion } from "../Services/queryExpansion";
import { dataIngestion } from "../Services/dataIngestion";
import { topics_insert } from "../utility/topicsinsert";
import { identifynamespace } from "../utility/identifynamespace";
import { namespaceMap } from "../utility/namespacemap";

export const POST_query = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    // EXPAND THE QUERY FOR BETTER CONTEXT
    const expanded = await QueryExpansion(query);

    console.log("expanded " + expanded);

    // CREATE EMBEDDINGS FOR THE EXPANDED QUERY
    const embeddings = await createEmbeddingService(expanded);

    //NAMESPACE IDENTIFICATION . FINDING THE BEST ONE OUT OF THE 5 (AT THIS POINT DO SPARSE SEARCH BM25)
    const filter_namespace = await identifynamespace(embeddings);
    // console.log(`filter namepace = ${filter_namespace}`);

    //FINDING THE TOP K RESULTS FROM THAT PARTICULAR NAMESPACE (DENSE SEARCH)
    const results = await queryService(expanded, embeddings, filter_namespace);

    //BY DEFAULT SEARCH IN namespace_misc.

    const abstract_context = results?.matches.map((item: I_textChunks) => {
      return item.metadata.abstract;
    });

    // console.log("ABSTRACT CONTEXT " + abstract_context);

    const geminiAnswer: string = await questionAnsweringService(
      abstract_context,
      query
    );

    res.status(200).send({ geminiAnswer: geminiAnswer });

    // res.status(200).send({ search_namespace: search_namespace });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
};

//cron job for data ingestion

export const GET_data_ingestion_new = async (req: Request, res: Response) => {
  try {
    // let { namespace_name_string, namespace_no, title } = req.body;
    const record_details = req.body;
    // const newRes: I_PaperContent[] = [];

    const result_of_copy: any = (
      await Promise.all(
        record_details.map(async (item: any) => {
          const namespace_name_string = item.namespace_name_string;
          const title = item.title;

          // let namespace_name: Index<RecordMetadata> =
          //   namespaceMap[namespace_name_string];

          //GET THE RELEVANT PAPERS FROM THE API (array of objects of size 5) ex [{} , {} , {} , .... , {}].
          const api_content = await topics_insert(title, null);

          // console.log("api content " + api_content);

          let result_from_ingestion: I_PaperContent[] = await dataIngestion(
            api_content,
            namespace_name_string
          );
          //now it bcomes [{ ,namespace_name_string: namespace_two}  , {...} , .. , {}]
          //  result_from_ingestion = [...result_from_ingestion , namespace_name_string]

          return result_from_ingestion;
        })
      )
    ).flat();

    // await new Promise((resolve) => setTimeout(resolve, 30000));

    // newRes will therby store all the papers for a particular namespace ie. if N1 has 5 topics and each have 3 papers then it will store 15 elements

    const insertData = await Promise.all(
      result_of_copy.map(async (item: any) => {
        const embeddings = await createEmbeddingService(item.abstract);
        console.log(item.abstract);

        return {
          id: item.paperId,
          abstract: item.abstract,
          embedding: embeddings,
          namespace_name: namespaceMap[item.namespace_name_string],
          namespace_name_string: item.namespace_name_string,
        };
      })
    );

    // console.log("insert data is " + insertData);
    const insertionStatus = await insertionService(insertData);

    // res.status(200).send({ insertionStatus: newRes });
    res.status(200).send(insertionStatus);
  } catch (e) {
    res.status(400).send({ message: (e as Error).message });
  }
};
