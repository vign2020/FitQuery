import { Router } from "express";
import { GET_transcripts, POST_query } from "../Controllers/homeController";

const router = Router();

router.get("/", GET_transcripts);
router.post("/get_embeddings_query", POST_query);

export default router;
