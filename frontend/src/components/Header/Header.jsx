import { useEffect, useRef, useState } from 'react';
import './Header.css';
import UserInfo from '../UserInfo/UserInfo.jsx';

const themes = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'violet', label: 'Violet' },
];

function Header({ currentTheme, onThemeChange, onMenuOpen }) {
    const [isThemeOpen, setIsThemeOpen] = useState(false);
    const themeDropdownRef = useRef(null);

    useEffect(() => {
      if (!isThemeOpen) return undefined;

      const handlePointerDown = (event) => {
        if (!themeDropdownRef.current?.contains(event.target)) {
          setIsThemeOpen(false);
        }
      };

      document.addEventListener('pointerdown', handlePointerDown);

      return () => document.removeEventListener('pointerdown', handlePointerDown);
    }, [isThemeOpen]);

    return (
      <header className="header">
        <button className="menu-button" type="button" aria-label="Open sidebar" onClick={onMenuOpen}>
          <svg aria-hidden="true">
            <use href="/icons.svg#icon-menu" />
          </svg>
        </button>
        <div className="theme-dropdown" ref={themeDropdownRef}>
          <button
            className={`theme-select-button ${isThemeOpen ? 'is-open' : ''}`}
            type="button"
            aria-expanded={isThemeOpen}
            onClick={() => setIsThemeOpen((current) => !current)}
          >
            Theme
            <svg aria-hidden="true">
              <use href="/icons.svg#icon-chevron-down" />
            </svg>
          </button>
          {isThemeOpen && (
            <ul className="theme-menu">
              {themes.map((theme) => (
                <li key={theme.id}>
                  <button
                    className={`theme-option theme-option-${theme.id} ${
                      currentTheme === theme.id ? 'is-selected' : ''
                    }`}
                    type="button"
                    onClick={() => {
                      onThemeChange(theme.id);
                      setIsThemeOpen(false);
                    }}
                  >
                    <span>{theme.label}</span>
                    <span className="theme-color-dot" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <UserInfo/>
      </header>
  );
}

export default Header;
