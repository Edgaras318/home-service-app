// SearchBar.tsx
import React, { useState } from "react";
import styles from "./SearchBar.module.scss";
import { CiSearch } from "react-icons/ci";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // Implement your search logic here (API call, redirect, etc.)
    console.log("Searching for:", searchTerm);
    // Reset search term after search
    setSearchTerm("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search..."
        aria-label="Search for services"
        className={styles.input}
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Trigger search on Enter key
      />
      <button
        className={styles.button}
        aria-label="Search"
        onClick={handleSearch} // Trigger search on button click
      >
        <CiSearch fontSize={24} />
      </button>
      {searchTerm && (
        <button
          className={styles.clearButton}
          onClick={() => setSearchTerm("")} // Clear the search term
          aria-label="Clear search"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;
