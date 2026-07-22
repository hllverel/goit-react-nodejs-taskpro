import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navigation.css";

const initialBoards = [
  {
    id: 1,
    title: "Project Office",
    icon: "📋",
  },
  {
    id: 2,
    title: "Personal",
    icon: "⭐",
  },
];

export default function Navigation() {
  const [boards, setBoards] = useState(initialBoards);

  const deleteBoard = (id) => {
    setBoards(boards.filter(board => board.id !== id));
  };

  const editBoard = (board) => {
    // Daha sonra EditBoardModal açılacak
    console.log("Edit:", board);
  };

  return (
    <nav className="navigation">
      {boards.map(board => (
        <NavLink
          key={board.id}
          to={`/home/${board.id}`}
          className={({ isActive }) =>
            isActive ? "board active" : "board"
          }
        >
          <div className="board-left">
            <span className="board-icon">{board.icon}</span>

            <span>{board.title}</span>
          </div>

          <div className="board-actions">
            <button
              onClick={(e) => {
                e.preventDefault();
                editBoard(board);
              }}
            >
              ✏️
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                deleteBoard(board.id);
              }}
            >
              🗑️
            </button>
          </div>
        </NavLink>
      ))}
    </nav>
  );
}