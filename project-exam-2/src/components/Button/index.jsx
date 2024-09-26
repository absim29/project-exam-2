import React from "react";
import Button from "react-bootstrap/Button";

function MyButton({ label, onClick, disabled, type }) {
  return (
    <Button
      variant="outline-dark"
      size="lg"
      className="px-4 custom-color rounded-pill shadow-sm"
      style={{ minWidth: "150px" }}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </Button>
  );
}

export default MyButton;
