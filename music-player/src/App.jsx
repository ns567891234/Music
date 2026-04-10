import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import useLocalStorage from './hooks/useLocalStorage';
import useDebounce from './hooks/useDebounce';
import useMusic from './hooks/useMusic';
import './index.css';

function App() {
  const { songs, loading, error } = useMusic('https://itunes.apple.com/search?term=pop&media=music&limit=50');
  
  const [searchInput, setSearchInput] = useState('');
  const debouncedQuery = useDebounce(searchInput, 300);
  
  const [filterArtist, setFilterArtist] = useState('All');
  const [sortBy, setSortBy] = useState('Default');
  
  // Custom hooks for persistent storage
  const [favorites, setFavorites] = useLocalStorage('musicFavorites', []);
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  // Apply theme class to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleFavorite = (songId) => {
    setFavorites(prev => 
      prev.includes(songId) 
        ? prev.filter(id => id !== songId) // Uses .filter() exclusively 
        : [...prev, songId]
    );
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // -------------------------------------------------------------
  // MILESTONE 3: Array Higher Order Functions (NO for/while loops)
  // -------------------------------------------------------------
  
  // 1. SEARCH: Input field to search songs or artists. Uses .filter()
  let processedSongs = songs.filter(song => {
    if (!debouncedQuery) return true;
    const lowerQuery = debouncedQuery.toLowerCase();
    const trackMatch = song.trackName && song.trackName.toLowerCase().includes(lowerQuery);
    const artistMatch = song.artistName && song.artistName.toLowerCase().includes(lowerQuery);
    return trackMatch || artistMatch;
  });

  // 2. FILTER: Filter songs by artist. Uses .filter()
  processedSongs = processedSongs.filter(song => {
    if (filterArtist === 'All') return true;
    if (filterArtist === 'Favorites') return favorites.includes(song.trackId);
    return song.artistName === filterArtist;
  });

  // 3. SORT: Sort songs alphabetically by track name. Uses .sort()
  processedSongs = processedSongs.sort((a, b) => {
    if (sortBy === 'A-Z') {
      return a.trackName.localeCompare(b.trackName);
    } else if (sortBy === 'Z-A') {
      return b.trackName.localeCompare(a.trackName);
    }
    return 0; // Default order
  });

  // Derived unique artists for the dropdown filter (using map, filter, sort)
  const uniqueArtists = songs
    .map(song => song.artistName)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();

  return (
    <div className={`app-container ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <main className="main-content">
        <SearchBar 
           searchInput={searchInput} 
           setSearchInput={setSearchInput}
           filterArtist={filterArtist} 
           setFilterArtist={setFilterArtist}
           uniqueArtists={uniqueArtists}
           sortBy={sortBy} 
           setSortBy={setSortBy}
        />
        
        {error && <div className="error-message">Error: {error}</div>}
        
        {loading ? (
          <div className="status-message">
            <div className="spinner">⏳ Loading top tracks...</div>
          </div>
        ) : (
          <SongList 
             songs={processedSongs} 
             favorites={favorites} 
             toggleFavorite={toggleFavorite} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
