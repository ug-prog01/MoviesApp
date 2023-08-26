import React from 'react';

// Header component receives props: searchTerm, onSearchChange, and onSearchSubmit
function Header({ searchTerm, onSearchChange, onSearchSubmit }) {
  return (
    <header>
      {/* Search form with input */}
      <form id="form" onSubmit={onSearchSubmit}>
        <input
          type="text"
          placeholder="Search"
          id="search"
          className="search"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </form>
    </header>
  );
}

export default Header;
