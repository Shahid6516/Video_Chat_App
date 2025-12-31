import { Socket, Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";


interface IRoomParams {
    roomId: string;
    peerId: string;
}

const roomHandler = (socket: Socket, io: Server) => {
    
   
    const createRoom = () => {
        const roomId = uuidv4();
        socket.emit("room-created", { roomId });
        console.log(`Room created with ID: ${roomId}`);
    };

   
    const joinedRoom = ({ roomId, peerId }: IRoomParams) => {
        if (!peerId) {
            console.error("Join attempt failed: No peerId provided.");
            return;
        }

        console.log(`User ${peerId} joining room ${roomId}`);
        
        socket.join(roomId);

   
        socket.to(roomId).emit("user-joined", { peerId });

      
        socket.on("disconnect", () => {
            console.log(`User ${peerId} disconnected from room ${roomId}`);
            socket.to(roomId).emit("user-disconnected", { peerId });
        });
    };

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
};

export default roomHandler;