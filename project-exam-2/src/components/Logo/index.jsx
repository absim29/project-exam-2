import React from "react";
import logo from "../../assets/Holidaze-2.png";
import { Link } from "react-router-dom";

/**
 * Logo component that displays the brand logo of the application.
 * The logo is wrapped in a link that navigates to the home page.
 *
 * @returns {JSX.Element} The rendered Logo component.
 */

function Logo() {
  const logoStyle = {
    width: "200px",
    height: "90px",
    objectFit: "cover",
  };
  return (
    <div className="position-absolute top-0 start-0">
      <Link to={"/"}>
        <img src={logo} alt="Holidaze Logo" style={logoStyle} />
      </Link>
    </div>
  );
}

export default Logo;
