import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import {connectdb} from "./utils/connectdb.js"
import useroutes from "./routes/user.routes.js"
import solroutes from "./routes/solution.routes.js"

dotenv.config()
const app=express()
const PORT=process.env.PORT

app.use(cookieParser())
app.use(urlencoded())
app.use(express.json({ limit: '10mb' }))
app.use(cors({
       origin:"http://localhost:5173",
    credentials:true,
}))
app.use("/api/auth",useroutes)
app.use("/api/sol",solroutes)

app.listen(PORT,()=>{
      console.log(`server listening on ${PORT}`)
      connectdb()
})