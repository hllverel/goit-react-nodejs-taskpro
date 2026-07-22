import { useState } from "react";
import "./Header.css";
import HeaderDashboard from "../HeaderDashboard/HeaderDashboard";

const themes = [
  { id: "light", label: "Light" },
  { id: "violet", label: "Violet" },
  { id: "dark", label: "Dark" },
];

export default function Header() {
  const [theme, setTheme] = useState("dark");
  const [showProfile, setShowProfile] = useState(false);

  const user = {
    name: "User",
    avatar:
      "https://ui-avatars.com/api/?name=User&background=bedbb0&color=000",
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
          <span>{user.name}</span>

          <img src={user.avatar} alt={user.name} />
        </button>

        {showProfile && (
          <div className="profile-dropdown">
            <p>Edit Profile</p>
          </div>
        )}
      </div>
    </header>
  );
}