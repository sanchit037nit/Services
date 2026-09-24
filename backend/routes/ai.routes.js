import express from "express";
import { askAI } from "../controllers/aicontroller.js";

const router = express.Router();

router.post("/ask", askAI);

export default router;