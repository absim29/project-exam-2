import React, { useEffect, useState } from "react";
import VenueImage from "../../assets/venue-card.jpg";
import Map from "../../assets/map.jpg";
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
      <div className="d-flex flex-column mt-0 col-md-9 col-lg-8 col-11 mx-3">
        <h2 className="first-font fs-2 my-4">{name}</h2>

        <div className="row col-12 mx-auto">
          {/* Check if there are media files available */}
          {media.length > 0 ? (
            <>
              {/* Big image on the left */}
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
                    style={{
                      height: "308px",
                      maxHeight: "400px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = VenueImage; // Fallback image
                    }}
                  />
                </a>
              </div>

              {/* Right side with smaller images */}
              <div className="col-12 col-md-6 d-flex flex-wrap px-1">
                {media.slice(1, 5).map((image, index) => (
                  <div
                    key={index}
                    className="col-6 mb-2 px-1 position-relative"
                  >
                    <a
                      href={image.url}
                      className="glightbox"
                      data-glightbox="type: image"
                    >
                      <img
                        src={image.url}
                        alt={image.alt || name}
                        className="w-100 rounded-4 shadow"
                        style={{
                          height: "150px",
                          maxHeight: "200px",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = VenueImage;
                        }}
                      />
                    </a>
                    {/* Overlay +X on the last image if there are more than 5 */}
                    {index === 3 && media.length > 5 && (
                      <div
                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          color: "white",
                          fontSize: "24px",
                          fontWeight: "bold",
                          borderRadius: "0.5rem",
                        }}
                      >
                        +{media.length - 5}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Hidden anchors for extra images to be accessible in glightbox */}
              {media.slice(5).map((image, index) => (
                <a
                  key={`hidden-${index}`}
                  href={image.url}
                  className="glightbox"
                  data-glightbox="type: image"
                  style={{ display: "none" }}
                >
                  {/* No need to render an img here since it's hidden */}
                </a>
              ))}
            </>
          ) : (
            <img
              src={VenueImage}
              alt={name}
              className="w-100 rounded-4 shadow mb-2 p-0"
            />
          )}
        </div>

        <div className="d-flex mt-4 justify-content-between flex-wrap">
          <div className="col-lg-7 col-md-6 col-12">
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
          <div className="col-lg-5 col-md-6 col-12 m-auto d-flex flex-column align-items-center">
            <Calendar
              bookings={bookings}
              maxGuests={maxGuests}
              venueId={venueId}
              isOwner={isOwner}
            />
          </div>
        </div>
        <h4 className="second-font fs-1 my-4">Amenities</h4>
        <ul className="third-font d-flex flex-wrap justify-content-start gap-3 fs-5">
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
        <div className="d-flex flex-wrap justify-content-between gap-3 col-11">
          <p
            className="third-font fs-5"
            // style={{ marginLeft: 0, marginRight: "auto" }}
          >
            {locationString}
          </p>
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Map}
              alt="location of venue"
              style={{ width: "300px" }}
              className="rounded"
            />
          </a>
        </div>
        <h4 className="second-font fs-1 mt-4">Bookings</h4>
        {bookings.length > 0 ? (
          <ul className="third-font fs-5">
            {bookings
              .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)) // Sort by dateFrom
              .map((booking) => (
                <div key={booking.id}>
                  {isOwner ? (
                    <p>
                      <strong>{booking.customer.name}</strong> :{" "}
                      {booking.guests} guests{", "}
                      {`${new Date(
                        booking.dateFrom
                      ).toLocaleDateString()} - ${new Date(
                        booking.dateTo
                      ).toLocaleDateString()}`}
                    </p>
                  ) : (
                    <p>
                      {`${new Date(
                        booking.dateFrom
                      ).toLocaleDateString()} - ${new Date(
                        booking.dateTo
                      ).toLocaleDateString()}`}
                    </p>
                  )}
                </div>
              ))}
          </ul>
        ) : (
          <p className="third-font fs-5">No bookings at this time.</p>
        )}
        <div>
          <h4 className="second-font fs-2 mt-4">Host</h4>

          <div
            className="d-flex justify-content-evenly align-items-center gap-2 bg-white w-50 p-2 mb-3 rounded shadow-sm"
            style={{ maxWidth: "300px", minWidth: "min-content" }}
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
          <div className="d-flex justify-content-center gap-3 my-5">
            <MyButton onClick={handleShowEditVenue} label="Edit" />
            <EditVenueModal
              show={showEditModal}
              handleClose={handleCloseEditVenue}
              venue={venue}
            />
            <MyButton onClick={handleShowDeleteVenue} label="Delete" />
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
