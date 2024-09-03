import React from "react";
import video from "../../assets/tropical-video.mp4";

function BackgroundVideo() {
  return (
    <div className="video-container">
      <video src={video} autoPlay loop muted />
    </div>
  );
}

export default BackgroundVideo;
