import React from "react";
import video from "../../assets/tropical-video.mp4";

function BackgroundVideo() {
  return (
    <div className="w-100 vh-100">
      <video
        style={{ objectFit: "cover" }}
        src={video}
        autoPlay
        loop
        muted
        className="w-100 h-100"
      />
    </div>
  );
}

export default BackgroundVideo;
