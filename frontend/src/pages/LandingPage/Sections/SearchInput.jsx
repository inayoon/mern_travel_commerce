import React from "react";

export default function SearchInput({ onSearch, searchTerm }) {
  return (
    <input
      className="p-2 border border-gray-300 rounded-md"
      type="text"
      placeholder="Search"
      onChange={onSearch}
      value={searchTerm}
    />
  );
}
