# Musify - React Music Web App 🎵

A fully functional, modern music web application built with React. This project fulfills the Milestone 1-3 requirements for the academic project.

## Features

- **Real-Time Data Fetching:** Automatically fetches the top pop tracks from the **iTunes Search API**. 
- **Dynamic Search:** Instantly search for songs or artists as you type. Implements **debouncing** to optimize rendering and filtering logic.
- **Filter & Sort:** Use dropdowns to seamlessly filter by a specific artist or explicitly sort tracks alphabetically (A-Z or Z-A).
- **Favorites:** Toggle your favorite tracks with the heart ❤️ button. Favorites are persistently stored in your browser's `localStorage` so your choices aren't lost on refresh.
- **Responsive & Modern UI:** Uses Pure CSS variables for a sleek design supporting both desktop and mobile views. Includes a smooth **Dark/Light Mode** toggle feature.

## Technology Stack 

- **Frontend:** React (Functional Components + Hooks: `useState`, `useEffect`)
- **API Fetching:** Native JavaScript `fetch()` API
- **Styling:** Pure CSS (No external UI libraries like Bootstrap or Tailwind)

## Academic Requirements Satisfied

### Milestone 1
- Clear project structure separated into logical components (`Header`, `SearchBar`, `SongList`, `SongCard`).
- Clean, descriptive README.md.
- Integration with the public iTunes API.

### Milestone 2
- Use `fetch()` to retrieve data gracefully.
- Dynamic data mapping for display.
- Loading and error states safely handled.
- Responsive mobile-first pure CSS design.

### Milestone 3 (Higher Order Functions Only!)
*Absolutely no `for` or `while` loops are used across the functionality. Everything operates on Array Higher-Order Functions.*
1. **Search:** Utilizes `.filter()` to dynamically check track names and artist names for query inclusion.
2. **Filter:** Extracts unique artists using chained `.map()` and `.filter()`, then applies a secondary `.filter()` to show specific subsets of songs or Favorites.
3. **Sort:** Leverages `.sort()` strictly to manage lexicographical ordering cleanly.
4. **Interaction:** Click handlers and state updates employ purely functional styles via `.filter()` arrays or spreading values (`...`).

## Setup Instructions

1. Ensure Node.js is installed.
2. Clone or download the directory and run `npm install`.
3. Start the application using `npm run dev`.
4. The application will be accessible at `http://localhost:5173`.
