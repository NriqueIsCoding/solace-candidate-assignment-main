"use client";

import React from "react";
import { SearchBarProps } from "@localtypes/index";

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, handleResetSearch }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center w-full md:w-1/2 md:ml-auto mb-4">
      <div className="flex-grow mb-4 md:mb-0">
        <input
          id="search-input"
          type="text"
          className="search-input"          
          placeholder="Search by name, city, degree, specialty or years of experience"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="md:ml-4 flex items-center">
        <button
          onClick={handleResetSearch}
          className="reset-button"
        >
          Reset Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
