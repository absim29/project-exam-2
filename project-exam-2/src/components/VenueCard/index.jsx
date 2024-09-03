import React from "react";
import VenueImage from "../../assets/venue-card.jpg";
import Rating from "@mui/material/Rating";

function VenueCard({ venue }) {
  // Extract relevant details from the venue data
  const { name, media, price, rating, location } = venue;

  return (
    <>
      <div className="venue-card">
        <img
          src={media.length > 0 && media[0].url ? media[0].url : VenueImage}
          alt={media.length > 0 && media[0].alt ? media[0].alt : name}
          className="card-image"
        />
        <h2 className="first-font">{name}</h2>
        <h3 className="first-font">
          {location.city}, {location.country}
        </h3>
        <h4 className="first-font">Price:${price}</h4>
        <Rating name="size-small" value={rating || 0} size="small" readOnly />
      </div>
    </>
  );
}

export default VenueCard;
