import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineQuestionMarkCircle,
  HiOutlineArrowLeftOnRectangle,
} from "react-icons/hi2";

import "./Navigation.css";

export default function Navigation({
  boards = [],
  activeBoard,
  onSelectBoard,
  onCreateBoard,
  onEditBoard,
  onDeleteBoard,
  onLogout,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button
        className="mobileToggle"
        onClick={() => setIsOpen(true)}
      >
        <HiOutlineMenu size={28} />
      </button>

      {isOpen && (
        <div
          className="overlay"
          onClick={closeSidebar}
        />
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <button
          className="closeBtn"
          onClick={closeSidebar}
        >
          <HiOutlineX size={24} />
        </button>

        <div className="logo">
          <div className="logoIcon">📋</div>
          <span className="logoText">Task Pro</span>
        </div>

        <div className="divider" />

        <p className="label">My boards</p>

        <button
          className="createBtn"
          onClick={onCreateBoard}
        >
          <span className="createLabel">
            Create new board
          </span>

          <span className="createIcon">
            <HiOutlinePlus size={18} />
          </span>
        </button>

        <nav className="nav">
          {boards.map((board) => (
            <div
              key={board.id}
              className={`boardItem ${
                activeBoard === board.id ? "active" : ""
              }`}
              onClick={() => {
                onSelectBoard(board.id);
                closeSidebar();
              }}
            >
              <span className="boardIcon">
                {board.icon || "📁"}
              </span>

              <span className="boardTitle">
                {board.title}
              </span>

              <div className="boardActions">
                <button
                  className="actionBtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditBoard(board);
                  }}
                >
                  <HiOutlinePencil size={16} />
                </button>

                <button
                  className="actionBtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteBoard(board.id);
                  }}
                >
                  <HiOutlineTrash size={16} />
                </button>
              </div>
            </div>
          ))}
        </nav>

        <div className="bottom">
          <div className="helpCard">
            <div className="helpIcon">
              <HiOutlineQuestionMarkCircle size={32} />
            </div>

            <p className="helpText">
              Need help?
              <br />
              Check our support resources.
            </p>

            <NavLink
              to="/help"
              className="helpBtn"
            >
              Help Center
            </NavLink>
          </div>

          <button
            className="logoutBtn"
            onClick={onLogout}
          >
            <span className="logoutIcon">
              <HiOutlineArrowLeftOnRectangle size={20} />
            </span>

            Log out
          </button>
        </div>
      </aside>
    </>
  );
}