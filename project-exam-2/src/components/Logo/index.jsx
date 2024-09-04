import React from "react";
import logo from "../../assets/Holidaze-2.png";
import { Link } from "react-router-dom";

function Logo() {
  const logoStyle = {
    width: "200px",
    height: "100px",
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
