import express from "express"
import { login,logout,signup,checkauth,deleteaccount, getusers ,updateprofile } from "../controllers/user.controller.js";
import { protectroute } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post("/update",updateprofile)
router.get("/users",getusers)
router.get("/check",protectroute,checkauth)
router.delete("/deleteaccount/:userid",protectroute,deleteaccount)

export default  router;