import React from "react";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <Logo />
      <nav>
        <ul>
          <li>
            <NavLink to="/venues">Venues</NavLink>{" "}
          </li>
          <li>
            Username{" "}
            <ul>
              <li>My Profile</li>
              <li>My Bookings</li>
              <li>Favourites</li>
              <li>Manage Bookings</li>
              <li>Sign Out</li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
