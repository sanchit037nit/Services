import express from "express"
import { createsol,updatesol,deletesol } from "../controllers/solution.controller.js";
import { protectroute } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/createsol",createsol)
router.post("/updatesol",updatesol)
router.delete("/deletesol/:solid",protectroute,deletesol)

export default  router;