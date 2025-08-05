import { Request, Response, NextFunction } from "express";
import { fetchTranscriptService } from "../Services/fetchTranscriptService";

export const GET_transcripts = async (req: Request, res: Response) => {
  try {
    const result = await fetchTranscriptService();
    res.status(200).send({ result: result });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};
export const POST_Query = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    //send this query to the fetchTranscriptService;

    res.status(200).send({ query: query });
  } catch (error) {}
};
