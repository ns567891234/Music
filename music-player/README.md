# Musify 🎵

Musify is a fully functional, modern, and responsive music web application built with React. It provides real-time access to the latest top pop tracks and allows users to search, filter, sort, and save their favorite songs. This project is built utilizing clean architecture, custom hooks, and strictly uses Array Higher Order Functions for complex data state management.

## 🚀 Live Demo

**[https://music-player-liart-nu.vercel.app](https://music-player-liart-nu.vercel.app)**

## ✨ Features

- **Real-Time Data via API Fetching:** Automatically fetches the top tracks from iTunes, securely managing loading and error states.
- **Dynamic Search:** Instantly search for songs or artists as you type. Implements **debouncing** to optimize rendering and filtering logic.
- **Filter & Sort:** Seamlessly filter by a specific artist or sort tracks alphabetically (A-Z or Z-A) to find exactly what you're looking for.
- **Favorites Management:** Toggle your favorite tracks. Favorites are persistently stored using a custom `useLocalStorage` hook so your choices remain even after a page refresh.
- **Modern Responsive UI:** Features a glassmorphism interface, custom Dark/Light Mode, aesthetic hover animations, and a fully mobile-responsive pure CSS layout.

## 📸 Screenshots

![Musify Homepage Placeholder](https://via.placeholder.com/800x450.png?text=Homepage+Screenshot)

![Dark Mode View](https://via.placeholder.com/800x450.png?text=Dark+Mode+Screenshot)

## 💻 Tech Stack Used

- **Frontend:** HTML5, pure CSS3 (Vanilla), JavaScript (ES6+), React 18+
- **Build Tool:** Vite
- **Data Management:** React Hooks (`useState`, `useEffect`) and Custom Persistent Hooks
- **Logic:** Native Array Methods (`.map()`, `.filter()`, `.sort()`) — strictly no `for`/`while` loops.

## 🔌 API Used

This project utilizes the public [Apple iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html) to dynamically fetch current music track data. Endpoint format:
`https://itunes.apple.com/search?term=pop&media=music&limit=50`

## ⚙️ Setup Instructions

To run this project locally, simply follow these steps:

1. **Pre-requisites:** Ensure you have [Node.js](https://nodejs.org/) installed.
2. **Clone the repository:**
   ```bash
   git clone <your-repo-link>
   cd music-player
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
5. **Open in Browser:** Navigate to `http://localhost:5173`

## 📁 Folder Structure

```text
music-player/
├── public/                # Static public assets
├── src/
│   ├── assets/            # Local images or icons
│   ├── components/        # Isolated reusable React components
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SongCard.jsx
│   │   └── SongList.jsx
│   ├── hooks/             # Custom extracted logic
│   │   ├── useDebounce.js
│   │   ├── useLocalStorage.js
│   │   └── useMusic.js
│   ├── App.jsx            # Main application root and layout
│   ├── index.css          # Fully comprehensive Pure CSS design system
│   └── main.jsx           # React app mount entry point
├── package.json           # Dependencies and scripts workflows
├── vite.config.js         # Vite bundler configurations
└── README.md              # Project documentation
```
