import React from "react";
import VenueImage from "../../assets/venue-card.jpg";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";

/**
 * VenueCard component displays information about a specific venue,
 * including its image, name, location, price, and rating.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {Object} props.venue - The venue data to be displayed.
 * @param {string} props.className - Additional CSS class(es) for styling.
 *
 * @param {string} props.venue.id - The unique identifier for the venue.
 * @param {string} props.venue.name - The name of the venue.
 * @param {Array<Object>} props.venue.media - The media associated with the venue.
 * @param {number} props.venue.price - The price of the venue.
 * @param {number} props.venue.rating - The rating of the venue.
 * @param {Object} props.venue.location - The location of the venue.
 * @param {string} props.venue.location.city - The city of the venue.
 * @param {string} props.venue.location.country - The country of the venue.
 *
 * @returns {JSX.Element} The rendered VenueCard component.
 */

function VenueCard({ venue, className }) {
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
        <div className={className}>
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
