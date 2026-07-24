import './Navigation.css';
import { useBoardWorkspace } from '../BoardWorkspace/useBoardWorkspace.js';
import BoardIcon from '../BoardIcon/BoardIcon.jsx';
import { boardBackgroundOptions } from '../BoardWorkspace/boardWorkspaceData.js';

const getHexLuminance = (hex) => {
  const normalizedHex = hex.length === 4
    ? hex.replace(/#(.)(.)(.)/, '#$1$1$2$2$3$3')
    : hex;
  const red = parseInt(normalizedHex.slice(1, 3), 16);
  const green = parseInt(normalizedHex.slice(3, 5), 16);
  const blue = parseInt(normalizedHex.slice(5, 7), 16);

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const getBackgroundAccent = (preview) => {
  const colors = preview?.match(/#[0-9a-fA-F]{3,6}/g) || [];

  if (colors.length === 0) return undefined;

  return colors.sort((firstColor, secondColor) =>
    getHexLuminance(secondColor) - getHexLuminance(firstColor),
  )[0];
};

const getBoardIconColor = (board) => {
  if (board.backgroundId === 'none') return undefined;

  const storedBackground = boardBackgroundOptions.find(
    (background) => background.id === board.backgroundId,
  );

  return getBackgroundAccent(board.backgroundPreview || storedBackground?.preview);
};

function Navigation({ onNavigate }) {
    const {
      boards,
      activeBoardId,
      setActiveBoardId,
      openCreateBoard,
      openEditBoard,
      deleteBoard,
    } = useBoardWorkspace();

    return (
      <nav className="navigation">
        <p className="navigation-caption">My boards</p>
        <button className="create-board-button" type="button" onClick={openCreateBoard}>
          <span>Create a new board</span>
          <span className="create-board-icon" aria-hidden="true">
            <svg>
              <use href="/icons.svg#icon-plus" />
            </svg>
          </span>
        </button>
        <ul className="boards-list">
          {boards.map((board) => (
            <li className="boards-item" key={board.id}>
              <button
                className={`boards-link ${board.id === activeBoardId ? 'is-active' : ''}`}
                type="button"
                onClick={() => {
                  setActiveBoardId(board.id);
                  onNavigate?.();
                }}
              >
                <span className="boards-link-icon" style={{ color: getBoardIconColor(board) }}>
                  <BoardIcon iconId={board.iconId} size={16} />
                </span>
                <span>{board.title}</span>
              </button>
              <button
                className="boards-action-button"
                type="button"
                aria-label={`Edit ${board.title}`}
                onClick={() => openEditBoard(board)}
              >
                <svg aria-hidden="true">
                  <use href="/icons.svg#icon-edit" />
                </svg>
              </button>
              <button
                className="boards-action-button"
                type="button"
                aria-label={`Delete ${board.title}`}
                onClick={() => deleteBoard(board.id)}
              >
                <svg aria-hidden="true">
                  <use href="/icons.svg#icon-trash" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </nav>
  );
}

export default Navigation;
