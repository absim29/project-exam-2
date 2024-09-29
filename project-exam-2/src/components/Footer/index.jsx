import React from "react";
import CopyrightIcon from "@mui/icons-material/Copyright";

/**
 * Footer component displaying copyright information.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */

function Footer() {
  return (
    <footer className="d-flex justify-content-center p-2">
      <p className="mb-0 d-flex">
        <CopyrightIcon />
        2024 HOLIDAZE | All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
