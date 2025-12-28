import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log(`Server is runing on port: ${process.env.PORT}`)
})
