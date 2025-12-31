import { io, Socket } from "socket.io-client";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as UUIDv4 } from "uuid";
import { peerReducer } from "../Reducers/peerReducers";
import { addPeerAction, removePeerAction } from "../Actions/peerAction";

const socket: Socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
});

export const SocketContext = createContext<any>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const [peers, dispatch] = useReducer(peerReducer, {});

  useEffect(() => {
    const userID = UUIDv4();
    const newPeer = new Peer(userID); 
    
    newPeer.on("open", (id) => {
      console.log("PeerJS is ready with ID:", id);
      setUser(newPeer);
    });

    const fetchUserFeed = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(stream);
      } catch (e) { console.error("Media error:", e); }
    };
    fetchUserFeed();

    socket.on("room-created", ({ roomId }) => navigate(`/room/${roomId}`));

    return () => {
      socket.off("room-created");
      newPeer.destroy();
    };
  }, [navigate]);

  useEffect(() => {
    if (!user || !stream) return;

    socket.on("user-joined", ({ peerId }) => {
      console.log("SIGNAL: Calling user:", peerId);
      const call = user.call(peerId, stream);
      call.on("stream", (remoteStream) => {
        console.log("MEDIA: Received stream from person I called");
        dispatch(addPeerAction(peerId, remoteStream));
      });
    });

    user.on("call", (call) => {
      console.log("SIGNAL: Answering call from:", call.peer);
      call.answer(stream);
      call.on("stream", (remoteStream) => {
        console.log("MEDIA: Received stream from caller");
        dispatch(addPeerAction(call.peer, remoteStream));
      });
    });

    socket.on("user-disconnected", ({ peerId }) => {
      dispatch(removePeerAction(peerId));
    });

    return () => {
      socket.off("user-joined");
      socket.off("user-disconnected");
      user.off("call");
    };
  }, [user, stream]);

  return (
    <SocketContext.Provider value={{ socket, user, stream, peers }}>
      {children}
    </SocketContext.Provider>
  );
};