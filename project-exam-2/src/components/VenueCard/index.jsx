import React from "react";
import VenueImage from "../../assets/venue-card.jpg";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

function VenueCard({ venue }) {
  // Extract relevant details from the venue data
  const { name, media, price, rating, location } = venue;

  const locationString = [
    location.city || location.country
      ? `${location.city || ""}${
          location.city && location.country ? ", " : ""
        }${location.country || ""}`
      : "Location Unavailable",
  ];

  return (
    <>
      <Link
        to={`/venues/${venue.id}`}
        className="text-decoration-none text-black"
      >
        <div className="venue-card">
          <img
            src={media.length > 0 && media[0].url ? media[0].url : VenueImage}
            alt={media.length > 0 && media[0].alt ? media[0].alt : name}
            className="card-image rounded-5 shadow"
            onError={(e) => {
              e.target.src = VenueImage;
            }}
          />
          <h2 className="first-font fs-5 mt-2">{name}</h2>
          <h3 className="third-font fs-5">{locationString}</h3>
          <h4 className="first-font fs-4">Price:${price}</h4>
          <Rating name="size-small" value={rating || 0} size="small" readOnly />
        </div>
      </Link>
    </>
  );
}

export default VenueCard;
