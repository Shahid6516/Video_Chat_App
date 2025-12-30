import { Socket } from "socket.io";
import { v4 as UUIDv4 } from "uuid";
import IRoomParams from "../interfaces/iRoomParams.js";

const rooms: Record<string, string[]> = {};
const roomHandler = (socket: Socket) => {


    const createRoom = () => {
        const roomId = UUIDv4();
        socket.join(roomId);

        rooms[roomId] = [];


        socket.emit("room-created", { roomId });
        console.log("room created with id:", socket.id)
    }

    const joinedRoom = ({ roomId, peerId }: { roomId: string; peerId: string }) => {

        if (rooms[roomId]) {

            console.log("New Room Joined:", roomId, "by peerId:", peerId);
            rooms[roomId].push(peerId);
            socket.join(roomId);

            socket.emit("get-users", {
                roomId,
                participants: rooms[roomId]
            })
        }

        socket.on("create-room", createRoom);
        socket.on("joined-room", joinedRoom);

    }
    }

    export default roomHandler;