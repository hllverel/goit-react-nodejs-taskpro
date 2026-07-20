import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import EditProfileModal from "../modals/EditProfileModal";
import "./Header.css";

export default function Header() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-right">
          <div className="theme-selector">
            <span>Theme</span>

            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="theme-select"
            >
              <option value="light">Light</option>
              <option value="violet">Violet</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <button
            type="button"
            className="user-info"
            onClick={() => setIsProfileOpen(true)}
          >
            <span className="user-name">
              {user?.name ?? "User"}
            </span>

            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="avatar"
              />
            ) : (
              <div className="avatar-placeholder">
                {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
              </div>
            )}
          </button>
        </div>
      </header>

      {isProfileOpen && (
        <EditProfileModal onClose={() => setIsProfileOpen(false)} />
      )}
    </>
  );
}