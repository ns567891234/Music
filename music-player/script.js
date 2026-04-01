const API_URL = 'https://itunes.apple.com/search?term=music&limit=25&media=music';

const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const volumeSlider = document.getElementById('volume-slider');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const coverImage = document.getElementById('cover-image');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const playlistEl = document.getElementById('playlist');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');

let songs = [];
let currentIndex = 0;
let isPlaying = false;

async function fetchMusic() {
    try {
        loadingSpinner.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        songs = data.results.filter(song => song.previewUrl);
        
        renderPlaylist();
        if (songs.length > 0) {
            loadSong(0);
        } else {
            errorMessage.textContent = 'No playable songs found.';
            errorMessage.classList.remove('hidden');
        }
    } catch (error) {
        errorMessage.textContent = 'Failed to load music. Please refresh the page.';
        errorMessage.classList.remove('hidden');
    } finally {
        loadingSpinner.classList.add('hidden');
    }
}

function renderPlaylist() {
    playlistEl.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.className = 'playlist-item';
        if (index === currentIndex) {
            li.classList.add('active');
        }
        
        const img = document.createElement('img');
        img.src = song.artworkUrl100 || 'https://via.placeholder.com/100';
        img.alt = song.trackName;
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'song-info';
        
        const title = document.createElement('h4');
        title.textContent = song.trackName;
        
        const artist = document.createElement('p');
        artist.textContent = song.artistName;
        
        infoDiv.appendChild(title);
        infoDiv.appendChild(artist);
        
        li.appendChild(img);
        li.appendChild(infoDiv);
        
        li.addEventListener('click', () => {
            loadSong(index);
            playSong();
        });
        
        playlistEl.appendChild(li);
    });
}

function loadSong(index) {
    currentIndex = index;
    const song = songs[currentIndex];
    
    songTitle.textContent = song.trackName;
    songArtist.textContent = song.artistName;
    const highResBuffer = song.artworkUrl100 ? song.artworkUrl100.replace('100x100bb', '500x500bb') : '';
    coverImage.src = highResBuffer || 'https://via.placeholder.com/300';
    audioPlayer.src = song.previewUrl;
    
    updatePlaylistHighlight();
}

function updatePlaylistHighlight() {
    const items = playlistEl.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('active');
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.classList.remove('active');
        }
    });
}

function togglePlay() {
    if (songs.length === 0) return;
    
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    coverImage.classList.add('playing');
    audioPlayer.play().catch(error => console.error('Playback failed:', error));
}

function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    coverImage.classList.remove('playing');
    audioPlayer.pause();
}

function playNext() {
    if (songs.length === 0) return;
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    if (isPlaying) playSong();
}

function playPrev() {
    if (songs.length === 0) return;
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    if (isPlaying) playSong();
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function updateProgress() {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = progressPercent;
        currentTimeEl.textContent = formatTime(currentTime);
        durationEl.textContent = formatTime(duration);
    }
}

function setProgress(e) {
    const value = e.target.value;
    const duration = audioPlayer.duration;
    if (duration) {
        audioPlayer.currentTime = (value / 100) * duration;
    }
}

function setVolume(e) {
    audioPlayer.volume = e.target.value;
}

playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', playNext);
audioPlayer.addEventListener('loadedmetadata', updateProgress);
progressBar.addEventListener('input', setProgress);
volumeSlider.addEventListener('input', setVolume);

fetchMusic();
