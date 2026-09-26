import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import {connectdb} from "./utils/connectdb.js"
import useroutes from "./routes/user.routes.js"
import solroutes from "./routes/solution.routes.js"
import aiRoutes from "./routes/ai.routes.js";
import aiConversationRoutes from "./routes/aiconversation.routes.js";
import contestRoutes from "./routes/contest.routes.js";
import { startContestWorker } from "./workers/contest.worker.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config()
const app=express()
const PORT=process.env.PORT

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://services-ten-ashy.vercel.app"],
        credentials: true
    }
});

// Expose io globally so workers and controllers can emit events
global.io = io;

io.on("connection", (socket) => {
    console.log("🟢 User connected to socket:", socket.id);

    // Clients emit this when they open a specific Contest Group chat
    socket.on("join_contest_group", (contestId) => {
        socket.join(contestId);
        console.log(`User ${socket.id} joined contest room: ${contestId}`);
    });

    socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
    });
});

app.use(cookieParser())
app.use(urlencoded())
app.use(express.json({ limit: '10mb' }))

const allowedOrigins = [
    "http://localhost:5173",
    "https://services-ten-ashy.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use("/api/auth",useroutes)
app.use("/api/sol", solroutes)
app.use("/api/ai", aiRoutes);
app.use(
    "/api/ai/conversations",
    aiConversationRoutes
);
app.use("/api/contest", contestRoutes);

server.listen(PORT,()=>{
      console.log(`server listening on ${PORT}`)
      connectdb()
      
      // Initialize background workers
      startContestWorker();
})