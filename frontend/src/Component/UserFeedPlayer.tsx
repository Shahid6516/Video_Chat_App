import { useEffect, useRef } from "react";

interface UserFeedPlayerProps {
  stream: MediaStream | null;
}

const UserFeedPlayer = ({ stream }: UserFeedPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="flex ml-5 ">
      <video
        ref={videoRef}
        className="rounded-xl border-zinc-700 border-2 overflow-hidden "
        style={{ width: "300px", height: "", backgroundColor: "black" }}
        muted
        autoPlay
        playsInline 
      />
    </div>
  );
};

export default UserFeedPlayer;