import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";

const Room = () => {
  const { id } = useParams();
  const { socket, user } = useContext(SocketContext);

  const fetchParticipantsList = ({
    roomId,
    participants,
  }: {
    roomId: string;
    participants: string[];
  }) => {
    console.log("Fetched Room Participants");
    console.log(roomId, participants);
  };

  useEffect(() => {
    if (user) {
      console.log("New user with id:", user._id);
      socket.emit("joined-room", { roomId: id, peerId: user?._id });
      socket.on("get-users", fetchParticipantsList);
    }
  }, [id, user, socket]);

  return <div>Room: {id}</div>;
};

export default Room;
