import { io, Socket } from "socket.io-client";
import React, { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const socket: Socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
});

export const SocketContext = createContext<any>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const enterRoom = ({ roomId }: { roomId: string }) => {
      navigate(`/room/${roomId}`);
    };

    socket.on("room-created", enterRoom);

    return () => {
      socket.off("room-created", enterRoom);
    };
  }, [navigate]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};