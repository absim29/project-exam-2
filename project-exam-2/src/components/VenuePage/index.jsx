import React, { useEffect, useState } from "react";
import VenueImage from "../../assets/venue-card.jpg";
import ProfileImage from "../../assets/user-image.jpg";
import Rating from "@mui/material/Rating";
import Calendar from "../Calendar";
import MyButton from "../Button";
import EditVenueModal from "../Modals/EditVenueModal";
import DeleteVenueModal from "../Modals/DeleteVenueModal";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import PetsIcon from "@mui/icons-material/Pets";

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
        <div className="d-flex mt-4 justify-content-between flex-wrap">
          <div>
            <h3 className="first-font fs-6">
              {locationString || "Location Unavailable"}
            </h3>
            <Rating
              name="size-small"
              value={rating || 0}
              size="small"
              readOnly
            />
            <h4 className="first-font fs-6">Price: ${price}</h4>
            <h4 className="first-font fs-6">Max Guests: {maxGuests}</h4>

            <h4 className="second-font fs-3">Description</h4>
            <p className="third-font">{description}</p>
          </div>
          <div>
            <Calendar
              bookings={bookings}
              maxGuests={maxGuests}
              venueId={venueId}
              isOwner={isOwner}
            />
          </div>
        </div>
        <h4 className="second-font fs-3">Amenities</h4>
        <ul className="third-font d-flex flex-wrap justify-content-between">
          <div className="d-flex">
            <WifiIcon />
            <p>{amenities.wifi ? "Free Wi-Fi" : "No Wi-Fi"}</p>
          </div>
          <div className="d-flex">
            <LocalParkingIcon />
            <p>{amenities.parking ? "Free Parking" : "No Parking"}</p>
          </div>
          <div className="d-flex gap-1">
            <FreeBreakfastIcon />
            <p>{amenities.breakfast ? "Free Breakfast" : "No Breakfast"}</p>
          </div>
          <div className="d-flex gap-1">
            <PetsIcon />
            <p>{amenities.pets ? "Pet Friendly" : "No Pets Allowed"}</p>
          </div>
        </ul>
        <h4 className="second-font fs-3">Location</h4>
        <p className="third-font">{locationString}</p>
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
        <div>
          <h4 className="second-font fs-3">Host</h4>

          <div className="d-flex justify-content-evenly align-items-center bg-white w-50 p-2 mb-3 rounded shadow-sm">
            <img
              src={
                owner.avatar && owner.avatar.url
                  ? owner.avatar.url
                  : ProfileImage
              }
              alt={owner.avatar && owner.avatar.alt ? owner.avatar.alt : name}
              className="w-50 rounded-circle"
            />
            <p className="third-font fs-6">{owner.name}</p>
          </div>
        </div>

        {/* Conditional rendering if the logged-in user is the owner */}
        {isOwner && (
          <div className="d-flex mx-auto gap-5 my-5">
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
      </div>
    </>
  );
}

export default VenuePage;
