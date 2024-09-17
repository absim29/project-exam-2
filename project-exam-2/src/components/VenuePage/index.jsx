import React, { useEffect, useState } from "react";
import VenueImage from "../../assets/venue-card.jpg";
import ProfileImage from "../../assets/user-image.jpg";
import Rating from "@mui/material/Rating";
import Calendar from "../Calendar";
import MyButton from "../Button";
import EditVenueModal from "../Modals/EditVenueModal";
import DeleteVenueModal from "../Modals/DeleteVenueModal";

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
    bookings,
    id: venueId,
    owner,
  } = venue;

  const locationString = [
    location.city || location.country
      ? `${location.city || ""}${
          location.city && location.country ? ", " : ""
        }${location.country || ""}`
      : "Location Unavailable",
  ];

  // State to hold logged-in user info
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Get logged-in user info from localStorage when component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("email");
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  // Check if the logged-in user is the owner of the venue
  const isOwner = loggedInUser && owner.email === loggedInUser;

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Handlers for Edit Venue Modal
  const handleShowEditVenue = () => setShowEditModal(true);
  const handleCloseEditVenue = () => setShowEditModal(false);

  // Handlers for Delete Venue Modal
  const handleShowDeleteVenue = () => setShowDeleteModal(true);
  const handleCloseDeleteVenue = () => setShowDeleteModal(false);

  return (
    <>
      <div className="d-flex flex-column w-75 mt-0">
        <h2 className="first-font fs-4 mt-2">{name}</h2>
        <img
          src={media.length > 0 && media[0].url ? media[0].url : VenueImage}
          alt={media.length > 0 && media[0].alt ? media[0].alt : name}
          className="w-100 rounded-4 shadow mb-2"
        />
        <h3 className="first-font fs-6">
          {locationString || "Location Unavailable"}
        </h3>
        <Rating name="size-small" value={rating || 0} size="small" readOnly />
        <h4 className="first-font fs-6">Price: ${price}</h4>
        <h4 className="first-font fs-6">Max Guests: {maxGuests}</h4>
        <h4 className="second-font fs-3">Description</h4>
        <p className="third-font">{description}</p>
        <h4 className="second-font fs-3">Amenities</h4>
        <ul className="third-font">
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
        <h4 className="second-font fs-3">Location</h4>
        <p className="third-font">{locationString}</p>
      </div>
      <h4 className="second-font fs-3">Bookings</h4>
      <ul className="third-font">
        {bookings.map((booking) => (
          <li key={booking.id} className="booking-period">
            {`${new Date(booking.dateFrom).toLocaleDateString()} - ${new Date(
              booking.dateTo
            ).toLocaleDateString()}`}
          </li>
        ))}
      </ul>
      <Calendar
        bookings={bookings}
        maxGuests={maxGuests}
        venueId={venueId}
        isOwner={isOwner}
      />
      <div>
        <h4 className="second-font fs-3">Host</h4>
        <img
          src={
            owner.avatar && owner.avatar.url ? owner.avatar.url : ProfileImage
          }
          alt={owner.avatar && owner.avatar.alt ? owner.avatar.alt : name}
          className="w-25 rounded-circle shadow mb-2"
        />
        <p className="first-font">{owner.name}</p>
      </div>

      {/* Conditional rendering if the logged-in user is the owner */}
      {isOwner && (
        <div className="owner-actions">
          <h4 className="second-font fs-3">Owner Actions</h4>
          <MyButton onClick={handleShowEditVenue} label="Edit Venue" />
          <EditVenueModal
            show={showEditModal}
            handleClose={handleCloseEditVenue}
            venue={venue}
          />
          <MyButton onClick={handleShowDeleteVenue} label="Delete Venue" />
          <DeleteVenueModal
            show={showDeleteModal}
            handleClose={handleCloseDeleteVenue}
          />
        </div>
      )}
    </>
  );
}

export default VenuePage;
