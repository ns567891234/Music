import React from 'react';
import SongCard from './SongCard';

const SongList = ({ songs, favorites, toggleFavorite }) => {
  if (!songs || songs.length === 0) {
    return <div className="no-results">No tracks found. Try a different search or filter.</div>;
  }

  return (
    <div className="song-grid">
      {songs.map(song => (
        <SongCard 
          key={song.trackId} 
          song={song} 
          isFavorite={favorites.includes(song.trackId)}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};

export default SongList;
