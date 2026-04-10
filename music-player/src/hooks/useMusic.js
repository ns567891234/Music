import { useState, useEffect } from 'react';

function useMusic(initialUrl) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        setLoading(true);
        // Using iTunes API as requested
        const res = await fetch(initialUrl);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setSongs(data.results);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMusic();
  }, [initialUrl]);

  return { songs, loading, error };
}

export default useMusic;
