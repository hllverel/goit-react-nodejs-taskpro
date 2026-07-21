import { useState } from 'react';
import BoardModal from '../BoardModal/BoardModal.jsx';
import ColumnModal from '../ColumnModal/ColumnModal.jsx';
import { BoardWorkspaceContext } from './useBoardWorkspace.js';

const createId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function BoardWorkspaceProvider({ children }) {
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [boardModal, setBoardModal] = useState({ isOpen: false, mode: 'create', board: null });
  const [columnModal, setColumnModal] = useState({ isOpen: false, mode: 'create', column: null });

  const activeBoard = boards.find((board) => board.id === activeBoardId) || null;

  const openCreateBoard = () => setBoardModal({ isOpen: true, mode: 'create', board: null });
  const openEditBoard = (board) => setBoardModal({ isOpen: true, mode: 'edit', board });
  const closeBoardModal = () => setBoardModal({ isOpen: false, mode: 'create', board: null });

  const openCreateColumn = () => setColumnModal({ isOpen: true, mode: 'create', column: null });
  const openEditColumn = (column) => setColumnModal({ isOpen: true, mode: 'edit', column });
  const closeColumnModal = () => setColumnModal({ isOpen: false, mode: 'create', column: null });

  const createBoard = ({ title, iconId, backgroundId }) => {
    const board = {
      id: createId('board'),
      title,
      iconId,
      backgroundId,
      columns: [],
    };

    setBoards((currentBoards) => [...currentBoards, board]);
    setActiveBoardId(board.id);
    closeBoardModal();
  };

  const updateBoard = ({ id, title, iconId, backgroundId }) => {
    setBoards((currentBoards) =>
      currentBoards.map((board) =>
        board.id === id ? { ...board, title, iconId, backgroundId } : board,
      ),
    );
    closeBoardModal();
  };

  const deleteBoard = (boardId) => {
    setBoards((currentBoards) => {
      const nextBoards = currentBoards.filter((board) => board.id !== boardId);

      if (activeBoardId === boardId) {
        setActiveBoardId(nextBoards[0]?.id || null);
      }

      return nextBoards;
    });
  };

  const createColumn = ({ title }) => {
    if (!activeBoardId) return;

    const column = {
      id: createId('column'),
      title,
      cards: [],
    };

    setBoards((currentBoards) =>
      currentBoards.map((board) =>
        board.id === activeBoardId
          ? { ...board, columns: [...board.columns, column] }
          : board,
      ),
    );
    closeColumnModal();
  };

  const updateColumn = ({ id, title }) => {
    setBoards((currentBoards) =>
      currentBoards.map((board) =>
        board.id === activeBoardId
          ? {
              ...board,
              columns: board.columns.map((column) =>
                column.id === id ? { ...column, title } : column,
              ),
            }
          : board,
      ),
    );
    closeColumnModal();
  };

  const deleteColumn = (columnId) => {
    setBoards((currentBoards) =>
      currentBoards.map((board) =>
        board.id === activeBoardId
          ? { ...board, columns: board.columns.filter((column) => column.id !== columnId) }
          : board,
      ),
    );
  };

  const value = {
    boards,
    activeBoard,
    activeBoardId,
    setActiveBoardId,
    openCreateBoard,
    openEditBoard,
    deleteBoard,
    openCreateColumn,
    openEditColumn,
    deleteColumn,
  };

  return (
    <BoardWorkspaceContext.Provider value={value}>
      {children}
      {boardModal.isOpen && (
        <BoardModal
          key={`${boardModal.mode}-${boardModal.board?.id || 'new'}`}
          mode={boardModal.mode}
          board={boardModal.board}
          onClose={closeBoardModal}
          onCreate={createBoard}
          onUpdate={updateBoard}
        />
      )}
      {columnModal.isOpen && (
        <ColumnModal
          key={`${columnModal.mode}-${columnModal.column?.id || 'new'}`}
          mode={columnModal.mode}
          column={columnModal.column}
          onClose={closeColumnModal}
          onCreate={createColumn}
          onUpdate={updateColumn}
        />
      )}
    </BoardWorkspaceContext.Provider>
  );
}
