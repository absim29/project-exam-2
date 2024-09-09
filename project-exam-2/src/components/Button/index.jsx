import React from "react";
import Button from "react-bootstrap/Button";

function MyButton({ label, onClick, disabled }) {
  return (
    <Button
      variant="outline-dark"
      size="lg"
      className="px-5"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
}

export default MyButton;
