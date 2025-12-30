import { Socket } from "socket.io";
import { v4 as UUIDv4 } from "uuid";

const rooms: Record<string, string[]> = {};

const roomHandler = (socket: Socket) => {
    const createRoom = () => {
        const roomId = UUIDv4();
        rooms[roomId] = [];
        socket.join(roomId);

        socket.emit("room-created", { roomId });
        console.log("Room created with id:", roomId);
    };

    const joinedRoom = ({ roomId, peerId }: { roomId: string; peerId: string }) => {
        if (rooms[roomId]) {
            console.log("New User Joined:", roomId, "Peer:", peerId);
            rooms[roomId].push(peerId);
            socket.join(roomId);

            socket.emit("get-users", {
                roomId,
                participants: rooms[roomId]
            });
        }
    };

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);
};

export default roomHandler;