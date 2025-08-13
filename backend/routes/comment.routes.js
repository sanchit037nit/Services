import express from "express"
import { createcom,updatecom,deletecom } from "../controllers/comment.controller.js";
import { protectroute } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/createcom",createcom)
router.post("/updatecom",updatecom)
router.delete("/deletecom/:comid",protectroute,deletecom)

export default  router;