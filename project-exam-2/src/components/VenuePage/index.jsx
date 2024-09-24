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
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";

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

    // Initialize GLightbox
    const lightbox = GLightbox({
      selector: ".glightbox",
      width: "90%", // Set a width percentage or fixed size
      height: "90%", // Set a height percentage or fixed size
      openEffect: "fade", // Choose an animation effect
      closeEffect: "fade", // Choose an animation effect
    });

    // Cleanup on unmount
    return () => {
      lightbox.destroy();
    };
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
      <div className="d-flex flex-column mt-0 col-8">
        <h2 className="first-font fs-2 mt-2">{name}</h2>
        {/* <img
          src={media.length > 0 && media[0].url ? media[0].url : VenueImage}
          alt={media.length > 0 && media[0].alt ? media[0].alt : name}
          className="w-100 rounded-4 shadow mb-2"
        /> */}
        <div className="row">
          {/* First image taking half of the container */}
          {media.length > 0 ? (
            <>
              <div className="col-12 col-md-6 mb-2 px-1">
                <a
                  href={media[0].url}
                  className="glightbox"
                  data-glightbox="type: image"
                >
                  <img
                    src={media[0].url}
                    alt={media[0].alt || name}
                    className="w-100 rounded-4 shadow"
                    style={{ height: "auto", maxHeight: "400px" }} // Adjust maxHeight as needed
                  />
                </a>
              </div>
              <div className="col-12 col-md-6 d-flex flex-wrap px-1">
                {media.slice(1).map((image, index) => (
                  <div key={index} className="col-6 mb-2 px-1">
                    <a
                      href={image.url}
                      className="glightbox"
                      data-glightbox="type: image"
                    >
                      <img
                        src={image.url}
                        alt={image.alt || name}
                        className="w-100 rounded-4 shadow"
                        style={{ height: "auto", maxHeight: "150px" }} // Adjust maxHeight as needed
                      />
                    </a>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <img
              src={VenueImage}
              alt={name}
              className="w-100 rounded-4 shadow mb-2"
            />
          )}
        </div>

        <div className="d-flex mt-4 justify-content-between flex-wrap">
          <div className="w-50">
            <h3 className="first-font fs-5">
              {locationString || "Location Unavailable"}
            </h3>
            <Rating
              name="size-small"
              value={rating || 0}
              size="medium"
              readOnly
            />
            <h4 className="first-font fs-5">Price: ${price}</h4>
            <h4 className="first-font fs-5">Max Guests: {maxGuests}</h4>

            <h4 className="second-font fs-1 mt-5">Description</h4>
            <p className="third-font fs-5">{description}</p>
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
        <h4 className="second-font fs-1 mb-4">Amenities</h4>
        <ul className="third-font d-flex flex-wrap justify-content-evenly fs-5">
          <div className="d-flex">
            <WifiIcon fontSize="large" />
            <p>{amenities.wifi ? "Free Wi-Fi" : "No Wi-Fi"}</p>
          </div>
          <div className="d-flex">
            <LocalParkingIcon fontSize="large" />
            <p>{amenities.parking ? "Free Parking" : "No Parking"}</p>
          </div>
          <div className="d-flex gap-1">
            <FreeBreakfastIcon fontSize="large" />
            <p>{amenities.breakfast ? "Free Breakfast" : "No Breakfast"}</p>
          </div>
          <div className="d-flex gap-1">
            <PetsIcon fontSize="large" />
            <p>{amenities.pets ? "Pet Friendly" : "No Pets Allowed"}</p>
          </div>
        </ul>
        <h4 className="second-font fs-1 mt-4">Location</h4>
        <p className="third-font fs-5">{locationString}</p>
        <h4 className="second-font fs-1 mt-4">Bookings</h4>
        {bookings.length > 0 ? (
          <ul className="third-font fs-5">
            {bookings.map((booking) => (
              <li key={booking.id} className="booking-period">
                {`${new Date(
                  booking.dateFrom
                ).toLocaleDateString()} - ${new Date(
                  booking.dateTo
                ).toLocaleDateString()}`}
              </li>
            ))}
          </ul>
        ) : (
          <p className="third-font fs-5">No bookings at this time.</p>
        )}
        <div>
          <h4 className="second-font fs-2 mt-4">Host</h4>

          <div
            className="d-flex justify-content-evenly align-items-center bg-white w-50 p-2 mb-3 rounded shadow-sm"
            style={{ maxWidth: "300px", minWidth: "200px" }}
          >
            <img
              src={
                owner.avatar && owner.avatar.url
                  ? owner.avatar.url
                  : ProfileImage
              }
              alt={owner.avatar && owner.avatar.alt ? owner.avatar.alt : name}
              className="rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <p className="third-font fs-5">{owner.name}</p>
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
