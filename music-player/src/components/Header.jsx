import React from 'react';

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="app-header">
      <div className="logo">
        <div className="logo-icon">♫</div>
        Musify
      </div>
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </header>
  );
};

export default Header;
