import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
console.log("SOCKET SERVER FILE LOADED 🔴✔✅▶");


dotenv.config();

app.use(cors(
    
));


const server = http.createServer(app);

const io = new Server(server, {

    cors:{
        origin: "*",
        methods: ["GET", "POST"]
    }
}
);


io.on("connection", (socket)=>{
    console.log("CONNECTION EVENT FIRED");

    console.log(`User connected: ${socket.id}`);

    socket.on("disconnect", ()=>{
        console.log(`User disconnected: ${socket.id}`);
    })
})




const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is runing on port: ${PORT}`);
});
