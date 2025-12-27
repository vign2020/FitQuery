import { Router } from "express";
import {
  // GET_Chunks,
  GET_data_ingestion_new,
  POST_query,
} from "../Controllers/homeController";

const router = Router();

// router.get("/", GET_Chunks);
router.post("/get_embeddings_query", POST_query);
router.get("/get_data_ingestion_new", GET_data_ingestion_new);

export default router;
