import React from "react";
import venue from "../../assets/venue-card.jpg";
import Rating from "@mui/material/Rating";

function VenueCard() {
  return (
    <>
      <div className="venue-card">
        <img src={venue} alt="The Venue" className="card-image" />
        <h2 className="first-font">Name, Place</h2>
        <h4 className="first-font">Price:$100</h4>
        <Rating name="size-small" defaultValue={2} size="small" />
      </div>
    </>
  );
}

export default VenueCard;
