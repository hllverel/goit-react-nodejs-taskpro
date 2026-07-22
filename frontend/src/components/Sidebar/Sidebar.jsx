import { useState } from "react";
import "./Sidebar.css";

import LogoComponent from "../LogoComponent/LogoComponent.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import BoardModal from "../BoardModal/BoardModal.jsx";
import NeedHelp from "../NeedHelp/NeedHelp.jsx"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // Daha sonra API logout işlemi eklenecek
    console.log("Logout");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <LogoComponent />

        <div className="boards-section">
          <p className="boards-title">My boards</p>

          <button
            className="create-board-btn"
            onClick={() => setIsOpen(true)}
          >
            <span className="plus">+</span>

            <span>Create a new board</span>
          </button>
        </div>

        <Navigation />
      </div>

      <NeedHelp />

        <div className="sidebar-bottom">
          {/* <div className="help-card">
            <p className="help-title">Need help?</p>

            <button className="help-btn">
              Open Help
            </button>
          </div> */}
        
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {isOpen && (
        <BoardModal
          onClose={() => setIsOpen(false)}
        />
      )}
    </aside>
  );
}
