import { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";

const CreateRoom = () => {
  const { socket } = useContext(SocketContext);
  const initRoom = () => {
    console.log("initalizing a request to create a room", socket.id);
    socket.emit("create-room");
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <button
        className="px-5 py-3 text-xl bg-orange-500 rounded-xl font-semibold border border-black border-b-5 hover:bg-orange-600"
        onClick={initRoom}
      >
        Start a new meeting in a new Room
      </button>
    </div>
  );
};

export default CreateRoom;
