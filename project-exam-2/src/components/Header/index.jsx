import React from "react";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

function Header() {
  const headerBackground = {
    backgroundColor: "#80A3AB",
    paddingBottom: "10px",
  };

  return (
    <div style={headerBackground}>
      <Logo />
      <nav>
        <ul className="d-flex justify-content-end gap-3 pt-3 px-2">
          <NavLink to="/venues" className="text-decoration-none text-black">
            Venues
          </NavLink>{" "}
          <NavDropdown title="Username" menuVariant="dark">
            <NavDropdown.Item as={NavLink} to="/profile">
              My Profile
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/bookings">
              My Bookings
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/favourites">
              Favourites
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/manage-bookings">
              Manage Bookings
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/signout">
              Sign Out
            </NavDropdown.Item>
          </NavDropdown>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
