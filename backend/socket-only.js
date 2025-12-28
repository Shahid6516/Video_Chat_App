import http from "http";
import { Server } from "socket.io";

const PORT = 5001;

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("CONNECTED:", socket.id);
});

server.listen(PORT, () => {
  console.log("SOCKET SERVER LISTENING ON", PORT);
});
