import React from "react";
import VenueImage from "../../assets/venue-card.jpg";
import Rating from "@mui/material/Rating";

function VenuePage({ venue }) {
  // Extract relevant details from the venue data
  const {
    name,
    description,
    media,
    price,
    rating,
    location,
    maxGuests,
    meta: amenities = {},
  } = venue;

  const locationString = [
    location.city || location.country
      ? `${location.city || ""}${
          location.city && location.country ? ", " : ""
        }${location.country || ""}`
      : "Location Unavailable",
  ];

  return (
    <>
      <div>
        <h2 className="first-font fs-5 mt-2">{name}</h2>
        <img
          src={media.length > 0 && media[0].url ? media[0].url : VenueImage}
          alt={media.length > 0 && media[0].alt ? media[0].alt : name}
        />
        <h3 className="first-font fs-6">
          {locationString || "Location Unavailable"}
        </h3>
        <Rating name="size-small" value={rating || 0} size="small" readOnly />
        <h4 className="first-font fs-4">Price: ${price}</h4>
        <h4 className="first-font fs-4">Max Guests: {maxGuests}</h4>
        <h4 className="second-font fs-4">Description</h4>
        <p>{description}</p>
        <h4 className="second-font fs-4">Amenities</h4>
        <ul>
          <li
            className={`amenity ${
              amenities.wifi ? "amenity-available" : "amenity-unavailable"
            }`}
          >
            {amenities.wifi ? "Free Wi-Fi" : "No Wi-Fi"}
          </li>
          <li
            className={`amenity ${
              amenities.parking ? "amenity-available" : "amenity-unavailable"
            }`}
          >
            {amenities.parking ? "Free Parking" : "No Parking"}
          </li>
          <li
            className={`amenity ${
              amenities.breakfast ? "amenity-available" : "amenity-unavailable"
            }`}
          >
            {amenities.breakfast ? "Free Breakfast" : "No Breakfast"}
          </li>
          <li
            className={`amenity ${
              amenities.pets ? "amenity-available" : "amenity-unavailable"
            }`}
          >
            {amenities.pets ? "Pet Friendly" : "No Pets Allowed"}
          </li>
        </ul>
        <h4 className="second-font fs-4">Location</h4>
        <p>{locationString}</p>
      </div>
    </>
  );
}

export default VenuePage;
