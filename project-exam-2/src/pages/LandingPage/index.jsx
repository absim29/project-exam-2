import React from "react";
import BackgroundVideo from "../../components/BackgroundVideo";
import MyButton from "../../components/Button";
import Logo from "../../components/Logo";
import { Link } from "react-router-dom";

function LandingPage() {
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
        <h3 className="first-font fs-5 mt-3">Already a user? LOGIN</h3>
        <div className="third-font d-flex flex-column justify-content-center align-items-center mx-5 px-5">
          <p>
            By signing in or creating an account, you agree with our{" "}
            <u>Terms & conditions</u> and <u>Privacy statement</u>
          </p>
          <p>All rights reserved. Copyright 2024 - HOLIDAZE</p>
        </div>
      </div>
    </>
  );
}
export default LandingPage;
