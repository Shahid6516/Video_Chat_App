import SocketIoClient from "socket.io-client";
import { createContext } from "react";

const WS_Server = "http://localhost:8000";
const SocketContext = createContext(null)