import { Router } from "express";
import {
  GET_Chunks,
  GET_data_ingestion,
  POST_query,
} from "../Controllers/homeController";

const router = Router();

router.get("/", GET_Chunks);
router.post("/get_embeddings_query", POST_query);
router.get("/get_data_ingestion", GET_data_ingestion);

export default router;
