import { Router } from "express";
import { GET_transcripts } from "../Controllers/homeController";

const router = Router();

router.get("/", GET_transcripts);

export default router;
