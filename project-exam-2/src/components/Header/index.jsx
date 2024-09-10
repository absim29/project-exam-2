import React, { useState } from "react";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";
import { Navbar, NavDropdown } from "react-bootstrap";
import LoginModal from "../LoginModal";
import RegistrationModal from "../RegistrationModal";

function Header() {
  const headerBackground = {
    backgroundColor: "#80A3AB",
    paddingBottom: "10px",
    paddingTop: "0",
  };

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  // Handlers for Login Modal
  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);

  // Handlers for Registration Modal
  const handleShowRegistration = () => setShowRegistrationModal(true);
  const handleCloseRegistration = () => setShowRegistrationModal(false);

  return (
    <>
      <Navbar sticky="top" className="p-0">
        <div style={headerBackground} className="w-100">
          <Logo />
          <ul className="d-flex justify-content-end gap-3 pt-3 px-2">
            <NavLink to="/venues" className="text-decoration-none text-black">
              Venues
            </NavLink>{" "}
            <NavLink
              onClick={handleShowLogin}
              className="text-decoration-none text-black"
            >
              Login
            </NavLink>
            <NavLink
              onClick={handleShowRegistration}
              className="text-decoration-none text-black"
            >
              Register
            </NavLink>
            {/* <NavDropdown title="Username" menuVariant="light" drop="start">
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
            </NavDropdown> */}
          </ul>
        </div>
      </Navbar>
      <LoginModal show={showLoginModal} handleClose={handleCloseLogin} />
      <RegistrationModal
        show={showRegistrationModal}
        handleClose={handleCloseRegistration}
      />
    </>
  );
}

export default Header;
