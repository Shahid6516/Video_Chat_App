import { useEffect, useRef } from "react";

interface UserFeedPlayerProps {
  stream: MediaStream | null | undefined;
}

const UserFeedPlayer = ({ stream }: UserFeedPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream || null;
    }
  }, [stream]);

  return (
    <div className="flex ml-5">
      <video
        ref={videoRef}
        className="rounded-xl border-zinc-700 border-2 overflow-hidden"
        style={{ width: "300px", height: "200px", backgroundColor: "black" }} 
        muted={true} 
        autoPlay
        playsInline 
      />
    </div>
  );
};

export default UserFeedPlayer;