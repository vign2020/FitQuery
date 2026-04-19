import { Router } from "express";
import { POST_migrationController } from "../Controllers/migrationController";

const router = Router();
router.post("/", POST_migrationController);

export default router;  
