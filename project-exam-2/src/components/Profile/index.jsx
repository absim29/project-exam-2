import React from "react";
import UserImage from "../../assets/user-image.jpg";

function Profile({ user }) {
  const { name, email, avatar, bio, venueManager, venues, bookings, _count } =
    user;

  return (
    <>
      <div className="venue-card">
        <img
          src={avatar.url.length > 0 && avatar.url ? avatar.url : UserImage}
          alt={avatar.url.length > 0 && avatar.alt ? avatar.alt : name}
          className="card-image"
        />
        <h2 className="first-font fs-5 mt-2">{name}</h2>
        <h3 className="first-font fs-6">{email}</h3>
        <h4 className="first-font fs-4">{bio}</h4>
        <h4 className="first-font fs-4">
          Venue manager: {venueManager ? "Yes" : "No"}
        </h4>
        <h4 className="first-font fs-4">
          {venues > 0
            ? venues.join(", ") // Join array items into a string, separated by commas
            : "No venues"}
        </h4>
        <h4 className="first-font fs-4">
          {bookings > 0
            ? bookings.join(", ") // Join array items into a string, separated by commas
            : "No bookings"}
        </h4>
        <h4 className="first-font fs-4">Bookings: {_count.bookings}</h4>
        <h4 className="first-font fs-4">Venues: {_count.venues}</h4>
      </div>
    </>
  );
}

export default Profile;
