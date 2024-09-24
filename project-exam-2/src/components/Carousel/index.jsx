import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function MyCarousel({ children }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
      touch={true}
      controls={true}
      indicators={true}
      nextIcon={<ArrowCircleRightIcon />}
      prevIcon={<ArrowCircleLeftIcon />}
    >
      {React.Children.map(children, (child, idx) => (
        <Carousel.Item key={idx}>
          <div className="d-flex justify-content-center align-items-center">
            {child}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default MyCarousel;
