import express from "express";
import { getContests, getContestGroup, joinGroup, postMessage } from "../controllers/contest.controller.js";
import { protectroute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Fetch all live and upcoming contests
router.get("/", getContests);

// Get the group for a specific contest
router.get("/group/:contestId", protectroute, getContestGroup);

// User joins a contest group
router.post("/group/:contestId/join", protectroute, joinGroup);

// User posts a message/solution to the group
router.post("/group/:contestId/message", protectroute, postMessage);

export default router;
