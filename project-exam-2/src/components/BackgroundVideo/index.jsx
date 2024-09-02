import React from "react";
import video from "../../assets/tropical-video.mp4";

const BackgroundVideo = () => {
  return (
    <div className="video-container">
      <video source src={video} autoPlay loop muted />
    </div>
  );
};

export default BackgroundVideo;
