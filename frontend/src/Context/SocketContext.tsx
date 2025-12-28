import { io } from "socket.io-client";
import React, { createContext } from "react";

const WS_Server = "http://localhost:5000";

const SocketContext = createContext<any | null>(null);

const socket = io(WS_Server, {
  transports: ["websocket"], 
});

interface Props {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
