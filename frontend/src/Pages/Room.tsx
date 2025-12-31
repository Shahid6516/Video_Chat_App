import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";
import UserFeedPlayer from "../Component/UserFeedPlayer";

const Room = () => {
  const { id } = useParams();
  const { socket, user, stream, peers } = useContext(SocketContext);

  useEffect(() => {
    if (user && user.id && id) {
      socket.emit("joined-room", { roomId: id, peerId: user.id });
    }
  }, [id, user, socket]);

  return (
    <div className="p-4 bg-zinc-900 min-h-screen text-white">
      <div className="flex flex-wrap gap-4">
        {/* Local Feed */}
        <div className="flex flex-col items-center">
          <p className="mb-2 text-sm text-gray-400">You (Local)</p>
          <UserFeedPlayer stream={stream} />
        </div>

        {Object.entries(peers).map(([peerId, peerData]: [string, any]) => (
          <div key={peerId} className="flex flex-col items-center">
            <p className="mb-2 text-sm text-blue-400">Remote Peer</p>
            <UserFeedPlayer stream={peerData.stream} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;