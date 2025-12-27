import { Request, Response } from "express";
import { createEmbeddingService } from "../Services/createEmbeddigService";
import { insertionService } from "../Services/insertionService";
import { queryService } from "../Services/queryService";
import { I_PaperContent, I_textChunks } from "../Types/types";
import { questionAnsweringService } from "../Services/questionAnsweringService";
import { QueryExpansion } from "../Services/queryExpansion";
import { dataIngestion } from "../Services/dataIngestion";
import { topics_insert } from "../utility/topicsinsert";

import {
  Topics_biomechanics,
  Topics_cardio_endurance,
  Topics_diet_supplementation,
  Topics_recovery_adaptations,
} from "../data/topics";
import path from "path";
import { file_insertion } from "../utility/fileinsertion";
import { isJsxOpeningElement } from "typescript";
import { identifynamespace } from "../utility/identifynamespace";
import { resourceUsage } from "process";
import { Index, RecordMetadata } from "@pinecone-database/pinecone";
import { namespaceMap } from "../utility/namespacemap";

const LIST_OF_NAMESPACES = [
  // Topics_biomechanics,
  // Topics_diet_supplementation,
  Topics_recovery_adaptations,
  Topics_cardio_endurance,
];

// export const GET_Chunks = async (req: Request, res: Response) => {
//   try {
//     const sizeOfdata = old_data.data.length;

//     const embedding_result = await Promise.all(
//       research_data.data.map(async (item, idx) => {
//         const embedding = await createEmbeddingService(item.abstract);
//         return {
//           _id: idx + sizeOfdata,
//           title: item.title,
//           embedding: embedding,
//           abstract: item.abstract,
//         };
//       })
//     );

//     const send_embeddings: string = await insertionService(embedding_result);

//     res.status(200).send({ message: send_embeddings });
//   } catch (error) {
//     res.status(500).send({ error: error });
//   }
// };

export const POST_query = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    // EXPAND THE QUERY FOR BETTER CONTEXT
    const expanded = await QueryExpansion(query);

    // CREATE EMBEDDINGS FOR THE EXPANDED QUERY
    const embeddings = await createEmbeddingService(expanded);

    //NAMESPACE IDENTIFICATION . FINDING THE BEST ONE OUT OF THE 4
    const filter_namespace = await identifynamespace(embeddings);

    //FINDING THE TOP K RESULTS FROM THAT PARTICULAR NAMESPACE
    const results = await queryService(expanded, embeddings, filter_namespace);

    // const abstract_context = results?.matches.map((item: I_textChunks) => {
    //   return item.metadata.abstract;
    // });

    // console.log("ABSTRACT CONTEXT " + abstract_context);

    // const geminiAnswer: string = await questionAnsweringService(
    //   abstract_context,
    //   query
    // );

    res.status(200).send({ resulsts: results });

    // res.status(200).send({ search_namespace: search_namespace });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error });
  }
};

// export const GET_data_ingestion_new = async (req: Request, res: Response) => {
//   try {
//     console.log("inside the get data ingestion new ");
//     let cnt = 0;

//     //going through the namespaces
//     for (const namespace of LIST_OF_NAMESPACES) {
//       const newRes: I_PaperContent[] = [];
//       //going through each topic of the namespace and extracting k papers from each (3 for now)

//       for (const item of namespace) {
//         ++cnt;

//         // console.log(item.title);

//         console.log("inside of namespace " + " and titlte " + item.title);

//         const content = await topics_insert(item);
//         // const content = await semanticscholar(item.title, item.count ?? 3);

//         //saving to a file just in case i run out requests to make.

//         const filePath = path.join(__dirname, "../data", `${item.title}.json`);

//         file_insertion(filePath, content);

//         //Does preprocessing i.e returns paperId , inserts abstract and title in one para.
//         const result_from_ingestion = await dataIngestion(
//           content,
//           item.namespace_name
//         );

//         newRes.push(...result_from_ingestion);

//         await new Promise((resolve) => setTimeout(resolve, 30000));
//       }

//       //newRes will therby store all the papers for a particular namespace ie. if N1 has 5 topics and each have 3 papers then it will store 15 elements

//       const insertData = await Promise.all(
//         newRes.map(async (item, idx) => {
//           const embeddings = await createEmbeddingService(item.abstract);

//           return {
//             id: item.paperId,
//             abstract: item.abstract,
//             embedding: embeddings,
//             namespace_id: item.namespace_id,7
//             namespace_name: item.namespace_name,
//           };
//         })
//       );

//       //insert data into pinecone
//       insertionService(insertData);
//     }

//     //now insert this into the pinecone db

//     // USE THE PAPER ID AS THE ID IN PINECONE . REMOVE ALL THE EXISTING DATA IN NAMESPACE 1

//     res
//       .status(200)
//       .send({ message: "successfully inserted " + cnt + "records" });
//   } catch (e) {
//     res.status(400).send({ message: (e as Error).message });
//   }
// };

export const GET_data_ingestion_new = async (req: Request, res: Response) => {
  try {
    let { namespace_name_string, namespace_no, title } = req.body;
    const newRes: I_PaperContent[] = [];

    let namespace_name: Index<RecordMetadata> =
      namespaceMap[namespace_name_string];

    const item = {
      namespace_name: namespace_name,
      namespace_no: namespace_no,
      title: title,
    };
    const content = await topics_insert(item);

    const result_from_ingestion = await dataIngestion(
      content,
      item.namespace_name
    );
    newRes.push(...result_from_ingestion);

    // console.log("new Res is " + JSON.stringify(newRes));

    // await new Promise((resolve) => setTimeout(resolve, 30000));

    //newRes will therby store all the papers for a particular namespace ie. if N1 has 5 topics and each have 3 papers then it will store 15 elements

    const insertData = await Promise.all(
      newRes.map(async (item, idx) => {
        const embeddings = await createEmbeddingService(item.abstract);

        return {
          id: item.paperId,
          abstract: item.abstract,
          embedding: embeddings,
          namespace_id: item.namespace_id,
          namespace_name: item.namespace_name,
        };
      })
    );

    insertionService(insertData);

    res.status(200).send({ message: "inserted recoreds successfully" });
  } catch (e) {
    res.status(400).send({ message: (e as Error).message });
  }
};
