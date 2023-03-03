import { Router } from "express";
import { rankingStats } from "../controllers/rankingController.js";

const router = Router();

router.get("/ranking", rankingStats);

export default router;
