/** @format */

import { Pinecone } from "@pinecone-database/pinecone";
import { NextFunction, Request, Response } from "express";
import NamespaceModel from "../Models/NamespaceModel";
import { createEmbeddingService } from "../Services/createEmbeddigService";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

const uri = process.env.MONGO_URI;
const NEW_INDEX_NAME = process.env.NEW_INDEX_NAME || "fit-query-v2";
const new_index = pc.index(NEW_INDEX_NAME);

export const POST_sparseEmbeddingsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  try {
    //create sparse embeddings and insert into mongodb
    const namespaces = await NamespaceModel.find(
      {},
      { namespace_name: 1, keywords: 1 },
    );

    for (const namespace of namespaces) {
      const embedding_values = await createEmbeddingService(namespace.keywords);

      await NamespaceModel.updateOne(
        { namespace_name: namespace.namespace_name },
        { $set: { values: embedding_values } },
      );
    }

    await sleep(2000); // Sleep for 2 seconds to ensure all MongoDB updates are completed

    res.status(200).json({ message: "inserted into mongoose collection" });
  } catch (error) {
    console.error("Error during sparse embedding migration:", error);
    res.status(500).json({
      message: "An error occurred during sparse embedding migration.",
      error: error,
    });
  }
};
