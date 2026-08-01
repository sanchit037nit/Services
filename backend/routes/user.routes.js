import express from "express"
import { login,logout,signup,checkauth,deleteaccount, getusers ,updateprofile,statusupdate } from "../controllers/user.controller.js";
import { protectroute } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post("/update",protectroute,updateprofile)
router.get("/users",getusers)
router.get("/check",protectroute,checkauth)
router.delete("/deleteaccount/:userid", protectroute, deleteaccount)
router.patch("/statusupdate/:id",protectroute,statusupdate)

export default  router;