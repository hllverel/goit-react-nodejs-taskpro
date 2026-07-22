import { useState } from "react";
import "./Header.css";
import HeaderDashboard from "../HeaderDashboard/HeaderDashboard";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { getAvatarUrl } from "../../utils/avatar.js";

const themes = [
  { id: "light", label: "Light" },
  { id: "violet", label: "Violet" },
  { id: "dark", label: "Dark" },
];

export default function Header() {
  const [theme, setTheme] = useState("dark");
  const [showProfile, setShowProfile] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const { user } = useAuth();

  const displayName = user?.name || "User";
  const avatarUrl = getAvatarUrl(user);

  const handleOpenEditProfile = () => {
    setIsEditProfileOpen(true);
    setShowProfile(false);
  };

  const handleThemeChange = (e) => {
    const value = e.target.value;
    setTheme(value);
    document.body.setAttribute("data-theme", value);
  };

  return (
    <header className="header">
      <HeaderDashboard />

      <div className="header-right">
        <div className="theme-switcher">
          <span className="theme-text">Theme</span>

          <select value={theme} onChange={handleThemeChange}>
            {themes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className="user-info"
          onClick={() => setShowProfile(!showProfile)}
        >
          <span>{displayName}</span>

          <img src={avatarUrl} alt={displayName} />
        </button>

        {showProfile && (
          <div className="profile-dropdown">
            <button
              type="button"
              className="profile-dropdown-item"
              onClick={handleOpenEditProfile}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {isEditProfileOpen && (
        <EditProfileModal onClose={() => setIsEditProfileOpen(false)} />
      )}
    </header>
  );
}