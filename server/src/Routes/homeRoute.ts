import { Router } from "express";
import {
  GET_data_ingestion_new,
  POST_query,
  GET_health_check,
} from "../Controllers/homeController";

const router = Router();

router.post("/get_embeddings_query", POST_query);
router.get("/get_data_ingestion_new", GET_data_ingestion_new);
router.get("/health", GET_health_check);

export default router;
