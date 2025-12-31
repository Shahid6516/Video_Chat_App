import { io, Socket } from "socket.io-client";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as UUIDv4 } from "uuid";
import { peerReducer } from "../Reducers/peerReducers";

const socket: Socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
});

export const SocketContext = createContext<any>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();

  const [peers, dispatch] = useReducer(peerReducer, {});

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

  const fetchUserFeed = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(stream);
  };

  useEffect(() => {
    const userID = UUIDv4();
    const newPeer = new Peer(userID);
    setUser(newPeer);
    fetchUserFeed();
    const enterRoom = ({ roomId }: { roomId: string }) => {
      navigate(`/room/${roomId}`);
    };

    socket.on("room-created", enterRoom);

    // socket.on("get-users", fetchParticipantsList);

    return () => {
      socket.off("room-created", enterRoom);
      socket.on("get-users", fetchParticipantsList);
    };
  }, [navigate]);

  useEffect(() => {
    if (!user || !stream) return;

    socket.on("user-joined", ({ peerId }) => {
      const call = user.call(peerId, stream);
      console.log("calling the new PEER:", peerId)

      call.on("stream", ()=>{
        console.log("Receiving stream from PEER:", peerId);
      })
      
    });

    user.on("call", (call) => {
      call.answer(stream);
      console.log("Answering the call from PEER:", call.peer);
    });

    socket.emit("ready");
  }, [user, stream]);

  return (
    <SocketContext.Provider value={{ socket, user, stream }}>
      {children}
    </SocketContext.Provider>
  );
};
