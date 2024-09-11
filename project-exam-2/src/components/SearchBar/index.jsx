import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const handleSearch = (e) => {
    setInput(e.target.value);
    onSearch(e.target.value); // Pass the input value to the parent
  };
  return (
    <>
      <div>
        <input
          type="text"
          value={input}
          placeholder="Search venues..."
          onChange={handleSearch}
          className="rounded-3 mb-4"
        />
      </div>
    </>
  );
}

export default SearchBar;
