import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SongList from './components/SongList';
import './index.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchInput, setSearchInput] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filterArtist, setFilterArtist] = useState('All');
  const [sortBy, setSortBy] = useState('Default');
  
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('musicFavorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [theme, setTheme] = useState('dark');

  // Milestone 2: Fetch data from API using fetch()
  useEffect(() => {
    const fetchMusic = async () => {
      try {
        setLoading(true);
        // Using iTunes API as requested
        const res = await fetch('https://itunes.apple.com/search?term=pop&media=music&limit=50');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setSongs(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMusic();
  }, []);

  // Sync favorites with localStorage
  useEffect(() => {
    localStorage.setItem('musicFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Apply theme class to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Bonus: Debouncing in search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchInput);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchInput]);

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
