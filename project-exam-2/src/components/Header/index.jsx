import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";
import { Navbar, NavDropdown } from "react-bootstrap";
import useSignOut from "../../hooks/useSignOut";
import LoginModal from "../Modals/LoginModal";
import RegistrationModal from "../Modals/RegistrationModal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserImage from "../../assets/user-image.jpg";

function Header() {
  const headerBackground = {
    backgroundColor: "#80A3AB",
    paddingBottom: "10px",
    paddingTop: "0",
    height: "65px",
  };

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [username, setUsername] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  // Handlers for Login Modal
  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);

  // Handlers for Registration Modal
  const handleShowRegistration = () => setShowRegistrationModal(true);
  const handleCloseRegistration = () => setShowRegistrationModal(false);

  // New handler to open Login Modal after registration
  const handleOpenLogin = () => {
    setShowRegistrationModal(false); // Close the registration modal
    setShowLoginModal(true); // Open the login modal
  };

  useEffect(() => {
    const storedAvatarUrl = localStorage.getItem("avatarUrl");
    const storedUsername = localStorage.getItem("username");
    setAvatarUrl(storedAvatarUrl); // Updates avatarUrl state
    setUsername(storedUsername); // Updates username state
  }, []);

  const signOut = useSignOut();

  return (
    <>
      <Navbar sticky="top" className="p-0 first-font shadow-sm">
        <div style={headerBackground} className="w-100">
          <Logo />
          <ul className="d-flex justify-content-end align-items-center gap-3 pt-3 px-2">
            <NavLink to="/venues" className="text-decoration-none text-black">
              Venues
            </NavLink>{" "}
            {avatarUrl ? (
              <>
                <NavDropdown
                  menuVariant="light"
                  drop="down"
                  title={
                    <span>
                      <img
                        src={avatarUrl || UserImage}
                        alt={username || "User"}
                        style={{
                          width: "30px",
                          height: "30px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </span>
                  }
                >
                  <NavDropdown.Item as={NavLink} to="/profile">
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item as={NavLink} onClick={signOut}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <NavDropdown
                  menuVariant="light"
                  drop="down"
                  title={
                    <span>
                      <AccountCircleIcon
                        style={{
                          width: "30px",
                          height: "30px",
                        }}
                      />{" "}
                      {/* Wrap with span */}
                    </span>
                  }
                >
                  <NavDropdown.Item
                    onClick={handleShowLogin}
                    className="text-decoration-none text-black"
                  >
                    Login
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={handleShowRegistration}
                    className="text-decoration-none text-black"
                  >
                    Register
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </ul>
        </div>
      </Navbar>
      <LoginModal show={showLoginModal} handleClose={handleCloseLogin} />
      <RegistrationModal
        show={showRegistrationModal}
        handleClose={handleCloseRegistration}
        handleOpenLogin={handleOpenLogin}
      />
    </>
  );
}

export default Header;
