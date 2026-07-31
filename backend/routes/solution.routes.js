import express from "express"
import { createsol,updatesol,deletesol,getsol, likeunlike, bookmark, commentonsolution, getbookmarks,getsolbyid,sendMessage} from "../controllers/solution.controller.js";
import { protectroute } from "../middlewares/auth.middleware.js"
import { runCode, checkStatus, } from "../controllers/compiler.controller.js";
import { reportPost,getReportedPosts,deleteReportedPost,restorePost,rejectreport } from "../controllers/report.controller.js";
import { isAdmin } from "../middlewares/admin.middleware.js"

const router = express.Router();

router.post("/createsol",protectroute,createsol)
router.post("/updatesol",protectroute,updatesol)
router.get("/get",getsol)
router.post("/ai",sendMessage)
router.get("/getbook",protectroute,getbookmarks)
router.get("/getsolbyid",protectroute,getsolbyid)
router.get("/like/:id", protectroute, likeunlike);
router.post("/bookmark/:id", protectroute, bookmark);
router.post("/comment/:id", protectroute, commentonsolution);
router.delete("/deletesol/:id", protectroute, deletesol)
router.post("/run", runCode);
router.get("/status/:token", checkStatus);
router.post("/:postId/report", protectroute, reportPost);
router.get("/reported", protectroute, isAdmin, getReportedPosts);
router.patch("/:postId/restore", protectroute, isAdmin, restorePost);
router.delete("/:postId/admin-delete", protectroute, isAdmin, deleteReportedPost);
router.put("/admin/review/:id",protectroute,rejectreport)

export default  router;