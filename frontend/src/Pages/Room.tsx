import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";
import UserFeedPlayer from "../Component/UserFeedPlayer";

const Room = () => {
  const { id } = useParams();
  const { socket, user, stream } = useContext(SocketContext);

  useEffect(() => {
    if (user) {
      console.log("New user with id:", user._id);
      socket.emit("joined-room", { roomId: id, peerId: user?._id });
    }
  }, [id, user, socket]);

  return (
    <div>
      Room: {id}
      <UserFeedPlayer stream={stream} />
    </div>
  );
};

export default Room;
