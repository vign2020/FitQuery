import { Request, Response, NextFunction } from "express";
import { fetchTranscriptService } from "../Services/fetchTranscriptService";
import { createEmbeddingService } from "../Services/createEmbeddigService";
import { chunkingService } from "../Services/chunkingService";
import { preprocessingService } from "../Services/preprocessingService";
import { I_ResultTranscription } from "../Types/types";
import { insertionService } from "../Services/insertionService";

export const GET_transcripts = async (req: Request, res: Response) => {
  try {
    const result = await fetchTranscriptService();
    //we need to do some preprocessing to the result
    const processedData: I_ResultTranscription = await preprocessingService(
      result
    );
    //This result now has to be embedded,but before that we need to do some preprocessing and split it into chunks.
    const chunks: any = await chunkingService(processedData.textData);

    //now send this data to pinecone for insertions but before that we need to remove the embeddings as it is stored separately in pinecone.
    // const insert_chunks = chunks.map((item: any, idx: number) => {
    //   return {
    //     id: item._id,
    //     title: processedData.title,
    //     chunk_text: item.chunk_text,
    //   };
    // });
    // console.log("insert chunks " + JSON.stringify(insert_chunks, null, 0));

    const send_embeddings = await insertionService(chunks, processedData.title);

    res.status(200).send({ chunks: chunks.data });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};
// export const POST_insert_embeddings = async (req : Request , res : Response)=>{
//   try{
//       const result = insertionService()
//   }
//   catch(e){

//   }
// }
export const POST_Query = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    //send this query to the fetchTranscriptService;
    const embeddings = await createEmbeddingService(query);
    res.status(200).send({ query: query, embeddings: embeddings });
  } catch (error) {}
};
