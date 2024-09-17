import React, { useState } from "react";
import BackgroundVideo from "../../components/BackgroundVideo";
import MyButton from "../../components/Button";
import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import LoginModal from "../../components/Modals/LoginModal";

function LandingPage() {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  return (
    <>
      <BackgroundVideo />
      <Logo />
      <div className="position-absolute w-100 h-100 top-0 d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-uppercase first-font">Escape the ordinary</h1>
        <h2 className="second-font">Your Next Adventure Starts Here</h2>
        <Link to="/venues">
          <MyButton label="Explore" />
        </Link>
        <h3 className="first-font fs-5 mt-3">
          Already a user?{" "}
          <u onClick={handleShow} className="cursor-pointer">
            LOGIN
          </u>
        </h3>
        <div className="third-font d-flex flex-column justify-content-center align-items-center mx-5 px-5">
          <p>
            By signing in or creating an account, you agree with our{" "}
            <u>Terms & conditions</u> and <u>Privacy statement</u>
          </p>
          <p>All rights reserved. Copyright 2024 - HOLIDAZE</p>
        </div>
      </div>
      <LoginModal show={showModal} handleClose={handleClose} />
    </>
  );
}
export default LandingPage;
