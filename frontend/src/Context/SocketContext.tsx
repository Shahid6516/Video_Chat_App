import { io } from "socket.io-client";
import React, { createContext } from "react";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"], // optional
});

export const SocketContext = createContext<any>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
