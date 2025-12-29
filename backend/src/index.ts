import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
}
);

io.on("connection", (socket)=>{
    console.log(`User connected: ${socket.id}`);

    socket.on("disconnect", ()=>{
        console.log(`User disconnected: ${socket.id}`);
    })
})


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is runing on port : ${PORT}`);
});


