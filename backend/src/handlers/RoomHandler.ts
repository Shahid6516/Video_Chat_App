import { Socket } from "socket.io";
import { v4 as UUIDv4 } from "uuid";

const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        const roomId = UUIDv4(); 
        socket.join(roomId);
        socket.emit("roomCreated", { roomId });


    }

}

export default roomHandler;