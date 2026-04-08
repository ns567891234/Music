import React from 'react';

const SearchBar = ({ 
  searchInput, 
  setSearchInput, 
  filterArtist, 
  setFilterArtist,
  uniqueArtists,
  sortBy,
  setSortBy
}) => {
  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search for tracks or artists..." 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      
      <div className="filter-sort-controls">
        <div className="control-group">
          <label htmlFor="filter-artist" className="control-label">Filter</label>
          <select 
            id="filter-artist"
            className="select-control"
            value={filterArtist}
            onChange={(e) => setFilterArtist(e.target.value)}
          >
            <option value="All">All Artists</option>
            <option value="Favorites">❤️ Favorites</option>
            {uniqueArtists.map(artist => (
              <option key={artist} value={artist}>{artist}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="sort-by" className="control-label">Sort</label>
          <select 
            id="sort-by"
            className="select-control"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Default">Default</option>
            <option value="A-Z">Track (A-Z)</option>
            <option value="Z-A">Track (Z-A)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
