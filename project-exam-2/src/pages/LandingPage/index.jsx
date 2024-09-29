import React from "react";
import BackgroundVideo from "../../components/BackgroundVideo";
import MyButton from "../../components/Button";
import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CopyrightIcon from "@mui/icons-material/Copyright";

/**
 * LandingPage component that serves as the entry point of the application.
 * It displays a background video, a logo, and a call-to-action button.
 *
 * @component
 * @example
 * return (
 *   <LandingPage />
 * )
 */

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
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h1 className="text-uppercase first-font">Escape the ordinary</h1>
        </motion.div>

        <h2 className="second-font">Your Next Adventure Starts Here</h2>

        <Link to="/venues">
          <MyButton label="Explore" />
        </Link>

        <p className="mt-2 d-flex">
          <CopyrightIcon />
          2024 HOLIDAZE | All rights reserved
        </p>
      </div>
    </motion.div>
  );
}
export default LandingPage;
