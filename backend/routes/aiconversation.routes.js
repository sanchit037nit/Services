import express from "express";

import {
    createConversation,
    getConversations,
    getConversation,
    deleteConversation,
     updateConversation,
} from "../controllers/aiconversation.controller.js";

import { protectroute } from "../middlewares/auth.middleware.js";

const router = express.Router();


// Create conversation
router.post(
    "/",
    protectroute,
    createConversation
);


// Get all conversations
router.get(
    "/",
    protectroute,
    getConversations
);


// Get one conversation
router.get(
    "/:id",
    protectroute,
    getConversation
);


// Delete conversation
router.delete(
    "/:id",
    protectroute,
    deleteConversation
);

router.put(
    "/:id",
    protectroute,
    updateConversation
);

export default router;