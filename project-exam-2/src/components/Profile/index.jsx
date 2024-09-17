import React, { useState } from "react";
import UserImage from "../../assets/user-image.jpg";
import MyButton from "../Button";
import VenueCard from "../VenueCard";
import AvatarModal from "../Modals/AvatarModal";
import VenueManagerModal from "../Modals/VenueManagerModal";
import AddVenueModal from "../Modals/AddVenueModal";

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
      <div className="profile-card d-flex justify-content-between bg-white p-5 w-50 m-5 rounded gap-5 shadow">
        <img
          src={avatar.url.length > 0 && avatar.url ? avatar.url : UserImage}
          alt={avatar.url.length > 0 && avatar.alt ? avatar.alt : name}
          className="rounded-circle w-50"
          onError={(e) => {
            e.target.src = UserImage;
          }}
        />
        <div className="d-flex flex-column justify-content-between">
          <div>
            <h4 className="first-font fs-4">{name}</h4>
          </div>
          <div>
            <h4 className="first-font fs-4">
              {venueManager ? "Venue manager: Yes" : "Venue manager: No"}
            </h4>
            <h4 className="first-font fs-4">Bookings: {_count.bookings}</h4>
          </div>
          <MyButton label="Edit Profile" onClick={handleShowEditProfile} />
          <AvatarModal
            show={showEditProfileModal}
            handleClose={handleCloseEditProfile}
            user={user}
          />
        </div>
      </div>

      <h4 className="second-font fs-1">Bio</h4>
      <p className="third-font fs-4">{bio}</p>

      <div className="d-flex gap-5">
        <div className="d-flex flex-column">
          <h4 className="second-font fs-1">Hosted Venues</h4>
          {venueManager ? (
            <>
              <ul className="third-font fs-4">
                {venues.length > 0 ? (
                  venues.map((venue) => (
                    <VenueCard key={venue.id} venue={venue} />
                  ))
                ) : (
                  <p className="third-font fs-4">No venues</p>
                )}
              </ul>
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
                label="BECOME VENUE MANAGER"
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
        <div className="d-flex flex-column">
          <h4 className="second-font fs-1">Upcoming Bookings</h4>
          <ul className="third-font fs-4">
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <VenueCard
                  key={`${booking.venue.id}-${booking.id}-${index}`} // Use a combination to ensure uniqueness
                  venue={booking.venue}
                />
              ))
            ) : (
              <p className="third-font fs-4">No bookings</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Profile;
