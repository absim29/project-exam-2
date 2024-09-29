import React, { useState } from "react";
import UserImage from "../../assets/user-image.jpg";
import MyButton from "../Button";
import VenueCard from "../VenueCard";
import AvatarModal from "../Modals/AvatarModal";
import VenueManagerModal from "../Modals/VenueManagerModal";
import AddVenueModal from "../Modals/AddVenueModal";
import MyCarousel from "../Carousel";
import { motion } from "framer-motion";

/**
 * Profile component displays user information, including their avatar,
 * biography, hosted venues, and bookings. It provides modals for editing
 * the profile, adding venues, and registering as a venue manager.
 *
 * @component
 * @param {Object} user - The user object containing user information.
 * @param {string} user.name - The user's name.
 * @param {Object} user.avatar - The user's avatar information.
 * @param {string} user.avatar.url - The URL of the user's avatar.
 * @param {string} user.avatar.alt - The alt text for the user's avatar.
 * @param {string} user.bio - The user's biography.
 * @param {boolean} user.venueManager - Indicates if the user is a venue manager.
 * @param {Array} user.bookings - An array of bookings made by the user.
 * @param {Array} user.venues - An array of venues hosted by the user.
 * @param {Object} user._count - Count of bookings and other user metrics.
 *
 * @returns {JSX.Element} The rendered profile component.
 */

function Profile({ user }) {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const handleShowEditProfile = () => setShowEditProfileModal(true);
  const handleCloseEditProfile = () => setShowEditProfileModal(false);

  const [showAddVenueModal, setShowAddVenueModal] = useState(false);
  const handleShowAddVenue = () => setShowAddVenueModal(true);
  const handleCloseAddVenue = () => setShowAddVenueModal(false);

  const [showVenueManagerModal, setShowVenueManagerModal] = useState(false);
  const handleShowVenueManager = () => setShowVenueManagerModal(true);
  const handleCloseVenueManager = () => setShowVenueManagerModal(false);

  const { name, avatar, bio, venueManager, bookings, venues, _count } = user;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="col-sm-11 col-md-8 col-3 d-flex flex-row flex-wrap flex-md-nowrap justify-content-center bg-white p-3 m-5 rounded gap-5 shadow"
        style={{ maxWidth: "500px", minWidth: "300px" }}
      >
        <img
          src={avatar.url.length > 0 && avatar.url ? avatar.url : UserImage}
          alt={avatar.url.length > 0 && avatar.alt ? avatar.alt : name}
          className="rounded-circle"
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = UserImage;
          }}
        />

        <div className="d-flex flex-column justify-content-between">
          <div>
            <h4 className="first-font fs-4">{name}</h4>
          </div>

          <div>
            <h4 className="third-font fs-5">
              {venueManager ? "Venue manager: Yes" : "Venue manager: No"}
            </h4>
            <h4 className="third-font fs-5">Bookings: {_count.bookings}</h4>
          </div>

          <MyButton label="Edit Profile" onClick={handleShowEditProfile} />

          <AvatarModal
            show={showEditProfileModal}
            handleClose={handleCloseEditProfile}
            user={user}
          />
        </div>
      </motion.div>

      <div
        className="w-75 ml-4"
        style={{ maxWidth: "600px", minWidth: "300px" }}
      >
        <h4 className="second-font fs-1">Bio</h4>
        <p className="third-font fs-5">{bio}</p>
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-5 mt-4">
        <div
          className="d-flex flex-column align-items-center mb-4"
          style={{ width: "300px" }}
        >
          <h4 className="second-font fs-1">Hosted Venues</h4>
          {venueManager ? (
            <>
              {venues.length > 0 ? (
                <MyCarousel>
                  {venues.map((venue) => (
                    <VenueCard
                      key={venue.id}
                      venue={venue}
                      className="venue-card-profile"
                    />
                  ))}
                </MyCarousel>
              ) : (
                <p className="third-font fs-4">No venues</p>
              )}
              <div className="mt-5">
                <MyButton label="New Venue" onClick={handleShowAddVenue} />
              </div>
              <AddVenueModal
                show={showAddVenueModal}
                handleClose={handleCloseAddVenue}
                user={user}
              />
            </>
          ) : (
            <>
              <MyButton
                label="Register as manager"
                onClick={handleShowVenueManager}
              />
              <VenueManagerModal
                show={showVenueManagerModal}
                handleClose={handleCloseVenueManager}
                user={user}
              />
            </>
          )}
        </div>

        <div
          className="d-flex flex-column align-items-center my-bookings mb-5"
          style={{ width: "300px" }}
        >
          <h4 className="second-font fs-1">My Bookings</h4>

          {bookings.length > 0 ? (
            <MyCarousel>
              {bookings.map((booking, index) => {
                // Format the dates for display
                const formattedDateFrom = new Date(
                  booking.dateFrom
                ).toLocaleDateString();
                const formattedDateTo = new Date(
                  booking.dateTo
                ).toLocaleDateString();

                return (
                  <div key={`${booking.id}-${index}`}>
                    <VenueCard
                      venue={booking.venue}
                      className="venue-card-profile"
                    />
                    <p className="mb-0 mx-3">
                      <strong>From:</strong> {formattedDateFrom}
                    </p>
                    <p className="mb-0 mx-3">
                      <strong>To:</strong> {formattedDateTo}
                    </p>
                  </div>
                );
              })}
            </MyCarousel>
          ) : (
            <p className="third-font fs-4">No bookings</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
