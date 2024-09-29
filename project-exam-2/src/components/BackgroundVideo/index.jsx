import React from "react";
import video from "../../assets/tropical-video.mp4";

/**
 * A React component that renders a full-screen background video.
 *
 * @component
 * @returns {JSX.Element} The rendered video element covering the full viewport.
 */

function BackgroundVideo() {
  return (
    <div className="w-100 vh-100" style={{ overflow: "hidden" }}>
      <video
        style={{ objectFit: "cover" }}
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="w-100 h-100"
      />
    </div>
  );
}

export default BackgroundVideo;
