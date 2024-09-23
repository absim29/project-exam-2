import React from "react";
import BackgroundVideo from "../../components/BackgroundVideo";
import MyButton from "../../components/Button";
import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <BackgroundVideo />
      <Logo />
      <div className="position-absolute w-100 h-100 top-0 d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-uppercase first-font">Escape the ordinary</h1>
        <h2 className="second-font">Your Next Adventure Starts Here</h2>
        <Link to="/venues">
          <MyButton label="Explore" />
        </Link>
        <p className="mt-3">All rights reserved. Copyright 2024 - HOLIDAZE</p>
      </div>
    </motion.div>
  );
}
export default LandingPage;
