import React from "react";
import logo from "../../assets/Holidaze-2.png";

function Logo() {
  const logoStyle = {
    width: "200px",
    height: "100px",
    objectFit: "cover",
  };
  return (
    <div className="position-fixed top-0 start-0">
      <img src={logo} alt="Holidaze Logo" style={logoStyle} />
    </div>
  );
}

export default Logo;
