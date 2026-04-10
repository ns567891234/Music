import React, { useState, useRef } from 'react';

const SongCard = ({ song, isFavorite, toggleFavorite }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Pause ALL other audio elements on the page before playing exactly this one
      document.querySelectorAll('audio').forEach(el => el.pause());
      audioRef.current.play().catch(err => console.error("Playback failed", err));
    }
  };

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
          <>
            <button 
              onClick={togglePlay} 
              className="play-button-overlay" 
              aria-label={isPlaying ? "Pause preview" : "Play preview"}
              style={{ border: 'none', cursor: 'pointer', fontSize: '24px' }}
            >
               {isPlaying ? '⏸' : '▶'}
            </button>
            <audio 
              ref={audioRef} 
              src={song.previewUrl} 
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
          </>
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
