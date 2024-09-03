import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function MyButton({ to, label }) {
  return (
    <Link to={to}>
      <Button variant="outline-dark" size="lg" className="px-5">
        {label}
      </Button>
    </Link>
  );
}

export default MyButton;
