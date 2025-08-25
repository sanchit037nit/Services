import express from "express"
import { createsol,updatesol,deletesol,getsol, likeunlike, bookmark, commentonsolution, getbookmarks,getsolbyid} from "../controllers/solution.controller.js";
import { protectroute } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/createsol",createsol)
router.post("/updatesol",updatesol)
router.get("/get",getsol)
router.get("/getbook",protectroute,getbookmarks)
router.get("/getsolbyid",protectroute,getsolbyid)
router.get("/like/:id", protectroute, likeunlike);
router.post("/bookmark/:id", protectroute, bookmark);
router.post("/comment/:id", protectroute, commentonsolution);
router.delete("/deletesol/:id",protectroute,deletesol)

export default  router;