import { io, Socket } from "socket.io-client";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as UUIDv4 } from "uuid";

const socket: Socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
});

export const SocketContext = createContext<any>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<Peer>();

  useEffect(() => {
    const userID = UUIDv4();
    const newPeer = new Peer(userID);
    setUser(newPeer);
    const enterRoom = ({ roomId }: { roomId: string }) => {
      navigate(`/room/${roomId}`);
    };

    socket.on("room-created", enterRoom);
    socket.on("get-users",fetchPartcipantsList);

    return () => {
      socket.off("room-created", enterRoom);
    };
  }, [navigate]);

  return (
    <SocketContext.Provider value={{ socket, user }}>
      {children}
    </SocketContext.Provider>
  );
};
