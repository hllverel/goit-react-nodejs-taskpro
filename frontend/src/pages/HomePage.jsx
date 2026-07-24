import { useEffect, useState } from 'react';
import Header from '../components/Header/Header.jsx';
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import ScreensPage from '../components/ScreensPage/ScreensPage.jsx';
import { BoardWorkspaceProvider } from '../components/BoardWorkspace/BoardWorkspaceContext.jsx';
import './HomePage.css';

function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (!isSidebarOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarOpen]);

  return (
    <div className={`taskpro-theme theme-${theme}`}>
      <BoardWorkspaceProvider>
        <div className={`taskpro-layout ${isSidebarOpen ? 'is-sidebar-open' : ''}`}>
          <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
          <button
            className="sidebar-backdrop"
            type="button"
            aria-label="Close sidebar"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="taskpro-content">
            <Header
              currentTheme={theme}
              onThemeChange={setTheme}
              onMenuOpen={() => setIsSidebarOpen(true)}
            />
            <ScreensPage />
          </div>
        </div>
      </BoardWorkspaceProvider>
    </div>
  );
}

export default HomePage;
