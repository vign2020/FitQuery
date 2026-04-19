/** @format */

import { Router } from "express";
import { POST_sparseEmbeddingsController } from "../Controllers/sparseEmbeddingsController";

const router = Router();
router.post("/", POST_sparseEmbeddingsController);

export default router;
