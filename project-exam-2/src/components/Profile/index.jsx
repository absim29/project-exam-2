import React, { useState } from "react";
import UserImage from "../../assets/user-image.jpg";
import MyButton from "../Button";
import VenueCard from "../VenueCard";
import AvatarModal from "../Modals/AvatarModal";
import VenueManagerModal from "../Modals/VenueManagerModal";
import AddVenueModal from "../Modals/AddVenueModal";
import MyCarousel from "../Carousel";
import { motion } from "framer-motion";

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
        className="col-sm-11 col-md-7 col-3 d-flex flex-row flex-wrap flex-md-nowrap justify-content-center bg-white p-3 m-5 rounded gap-5 shadow"
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
        {/* </div> */}
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
              <MyCarousel>
                {venues.length > 0 ? (
                  venues.map((venue) => (
                    <VenueCard key={venue.id} venue={venue} />
                  ))
                ) : (
                  <p className="third-font fs-4">No venues</p>
                )}
              </MyCarousel>

              <MyButton label="New Venue" onClick={handleShowAddVenue} />
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
          className="d-flex flex-column align-items-center"
          style={{ width: "300px" }}
        >
          <h4 className="second-font fs-1">My Bookings</h4>

          {bookings.length > 0 ? (
            <MyCarousel>
              {bookings.map((booking, index) => (
                <VenueCard
                  key={`${booking.id}-${index}`} // Use a combination to ensure uniqueness
                  venue={booking.venue}
                />
              ))}
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
