import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Form } from "react-bootstrap";

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
