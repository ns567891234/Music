import React from 'react';

const SongCard = ({ song, isFavorite, toggleFavorite }) => {
  return (
    <div className="song-card">
      <div className="artwork-container">
        <img 
          src={song.artworkUrl100 ? song.artworkUrl100.replace('100x100bb', '300x300bb') : 'https://via.placeholder.com/300'} 
          alt={`${song.trackName} artwork`} 
          className="artwork"
          loading="lazy"
        />
        {song.previewUrl && (
          <a href={song.previewUrl} target="_blank" rel="noopener noreferrer" className="play-button-overlay" aria-label="Play preview">
            ▶
          </a>
        )}
      </div>
      
      <div className="song-info">
        <h3 className="song-title" title={song.trackName}>{song.trackName}</h3>
        <p className="song-artist" title={song.artistName}>{song.artistName}</p>
        
        <div className="card-actions">
          <span className="price">{song.trackPrice > 0 ? `$${song.trackPrice}` : 'Free'}</span>
          <button 
            className={`fav-button ${isFavorite ? 'active' : ''}`}
            onClick={() => toggleFavorite(song.trackId)}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            title="Toggle Favorite"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
