import React from "react";
import Button from "react-bootstrap/Button";

/**
 * A customizable button component that uses Bootstrap styling.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The text label displayed on the button.
 * @param {function} props.onClick - The function to be called when the button is clicked.
 * @param {boolean} [props.disabled] - Optional. Indicates whether the button should be disabled.
 * @param {string} [props.type] - Optional. The button type (e.g., "button", "submit").
 *
 * @returns {JSX.Element} The rendered button component.
 */

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
