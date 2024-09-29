import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Form } from "react-bootstrap";

/**
 * SearchBar component allows users to input a search term
 * for finding venues. It calls the provided onSearch function
 * whenever the input changes, passing the current input value.
 *
 * @component
 * @param {Object} props - The props for the component.
 * @param {function} props.onSearch - The function to call when the input value changes.
 * This function receives the current input value as an argument.
 *
 * @returns {JSX.Element} The rendered search bar component.
 */

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const handleSearch = (e) => {
    setInput(e.target.value);
    onSearch(e.target.value); // Pass the input value to the parent
  };
  return (
    <div className="position-relative mb-4">
      <Form.Group>
        <Form.Label htmlFor="searchbar" className="visually-hidden">
          Search Venues
        </Form.Label>

        <Form.Control
          id="searchbar"
          type="text"
          value={input}
          placeholder="Search venues..."
          onChange={handleSearch}
          className="rounded-3 px-5" // Padding left to avoid overlap with the icon
          style={{ border: "1px solid #ccc" }} // Adding a light border
        />
      </Form.Group>

      <SearchIcon
        className="position-absolute"
        style={{
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)", // Center the icon vertically
          color: "#aaa",
        }}
      />
    </div>
  );
}

export default SearchBar;
