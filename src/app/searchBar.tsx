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
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Search by name, city, degree, specialty or years of experience"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="md:ml-4 flex items-center">
        <button
          onClick={handleResetSearch}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Reset Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
