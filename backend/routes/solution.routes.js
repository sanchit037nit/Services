import express from "express"
import { createsol,updatesol,deletesol,getsol, likeunlike, bookmark, commentonsolution} from "../controllers/solution.controller.js";
import { protectroute } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/createsol",createsol)
router.post("/updatesol",updatesol)
router.get("/get",getsol)
router.post("/like/:id", protectroute, likeunlike);
router.post("/bookmark/:id", protectroute, bookmark);
router.post("/comment/:id", protectroute, commentonsolution);
router.delete("/deletesol/:solid",protectroute,deletesol)

export default  router;