import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BoardModal from '../BoardModal/BoardModal.jsx';
import ColumnModal from '../ColumnModal/ColumnModal.jsx';
import TaskModal from '../TaskModal/TaskModal.jsx';
import FiltersModal from '../FiltersModal/FiltersModal.jsx';
import { selectToken } from '../../store/auth/authSelectors.js';
import { BoardWorkspaceContext } from './useBoardWorkspace.js';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const legacyWorkspaceStorageKey = 'taskpro-board-workspace';
const createTempId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const readLegacyWorkspace = () => {
  try {
    return JSON.parse(window.localStorage.getItem(legacyWorkspaceStorageKey)) || {};
  } catch {
    return {};
  }
};

const requestBoardJson = async (path, { method = 'GET', body } = {}, token) => {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      Authorization: `Bearer ${token}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (response.status === 204) return null;

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Board request failed');
  }

  return data;
};

export function BoardWorkspaceProvider({ children }) {
  const token = useSelector(selectToken);
  const [boards, setBoards] = useState([]);
  const [activeBoardId, setActiveBoardId] = useState(null);
  const [isLoadingBoards, setIsLoadingBoards] = useState(true);
  const [boardModal, setBoardModal] = useState({ isOpen: false, mode: 'create', board: null });
  const [columnModal, setColumnModal] = useState({ isOpen: false, mode: 'create', column: null });
  const [taskModal, setTaskModal] = useState({
    isOpen: false,
    mode: 'create',
    columnId: null,
    task: null,
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const activeBoard = boards.find((board) => board.id === activeBoardId) || null;

  useEffect(() => {
    if (!token) {
      return;
    }

    let isActive = true;

    const loadBoards = async () => {
      try {
        let loadedBoards = await requestBoardJson('/boards', {}, token);

        if (loadedBoards.length === 0) {
          const legacyBoards = readLegacyWorkspace().boards;

          if (Array.isArray(legacyBoards) && legacyBoards.length > 0) {
            loadedBoards = await Promise.all(
              legacyBoards.map((board) =>
                requestBoardJson(
                  '/boards',
                  {
                    method: 'POST',
                    body: {
                      title: board.title,
                      iconId: board.iconId,
                      backgroundId: board.backgroundId,
                      backgroundPreview: board.backgroundPreview,
                      columns: board.columns || [],
                    },
                  },
                  token,
                ),
              ),
            );
            window.localStorage.removeItem(legacyWorkspaceStorageKey);
          }
        }

        if (!isActive) return;

        setBoards(loadedBoards);
        setActiveBoardId((currentBoardId) =>
          loadedBoards.some((board) => board.id === currentBoardId)
            ? currentBoardId
            : loadedBoards[0]?.id ?? null,
        );
      } catch (error) {
        console.error(error);
      } finally {
        if (isActive) {
          setIsLoadingBoards(false);
        }
      }
    };

    loadBoards();

    return () => {
      isActive = false;
    };
  }, [token]);

  const openCreateBoard = () => setBoardModal({ isOpen: true, mode: 'create', board: null });
  const openEditBoard = (board) => setBoardModal({ isOpen: true, mode: 'edit', board });
  const closeBoardModal = () => setBoardModal({ isOpen: false, mode: 'create', board: null });

  const openCreateColumn = () => setColumnModal({ isOpen: true, mode: 'create', column: null });
  const openEditColumn = (column) => setColumnModal({ isOpen: true, mode: 'edit', column });
  const closeColumnModal = () => setColumnModal({ isOpen: false, mode: 'create', column: null });
  const openCreateTask = (columnId) =>
    setTaskModal({ isOpen: true, mode: 'create', columnId, task: null });
  const openEditTask = (columnId, task) =>
    setTaskModal({ isOpen: true, mode: 'edit', columnId, task });
  const closeTaskModal = () =>
    setTaskModal({ isOpen: false, mode: 'create', columnId: null, task: null });
  const openFilters = () => setIsFiltersOpen(true);
  const closeFilters = () => setIsFiltersOpen(false);

  const updateActiveBoard = (updater) => {
    setBoards((currentBoards) =>
      currentBoards.map((board) => (board.id === activeBoardId ? updater(board) : board)),
    );
  };

  const createBoard = async ({ title, iconId, backgroundId, backgroundPreview }) => {
    try {
      const board = await requestBoardJson(
        '/boards',
        { method: 'POST', body: { title, iconId, backgroundId, backgroundPreview } },
        token,
      );

      setBoards((currentBoards) => [board, ...currentBoards]);
      setActiveBoardId(board.id);
      closeBoardModal();
    } catch (error) {
      console.error(error);
    }
  };

  const updateBoard = async ({ id, title, iconId, backgroundId, backgroundPreview }) => {
    try {
      const updatedBoard = await requestBoardJson(
        `/boards/${id}`,
        { method: 'PATCH', body: { title, iconId, backgroundId, backgroundPreview } },
        token,
      );

      setBoards((currentBoards) =>
        currentBoards.map((board) => (board.id === id ? updatedBoard : board)),
      );
      closeBoardModal();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBoard = async (boardId) => {
    try {
      await requestBoardJson(`/boards/${boardId}`, { method: 'DELETE' }, token);

      setBoards((currentBoards) => {
        const nextBoards = currentBoards.filter((board) => board.id !== boardId);

        if (activeBoardId === boardId) {
          setActiveBoardId(nextBoards[0]?.id ?? null);
        }

        return nextBoards;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createColumn = async ({ title }) => {
    if (!activeBoardId) return;

    try {
      const updatedBoard = await requestBoardJson(
        `/boards/${activeBoardId}/columns`,
        { method: 'POST', body: { title } },
        token,
      );

      setBoards((currentBoards) =>
        currentBoards.map((board) => (board.id === activeBoardId ? updatedBoard : board)),
      );
      closeColumnModal();
    } catch (error) {
      console.error(error);
    }
  };

  const updateColumn = async ({ id, title }) => {
    try {
      const updatedBoard = await requestBoardJson(
        `/boards/${activeBoardId}/columns/${id}`,
        { method: 'PATCH', body: { title } },
        token,
      );

      setBoards((currentBoards) =>
        currentBoards.map((board) => (board.id === activeBoardId ? updatedBoard : board)),
      );
      closeColumnModal();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteColumn = async (columnId) => {
    try {
      const updatedBoard = await requestBoardJson(
        `/boards/${activeBoardId}/columns/${columnId}`,
        { method: 'DELETE' },
        token,
      );

      setBoards((currentBoards) =>
        currentBoards.map((board) => (board.id === activeBoardId ? updatedBoard : board)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async ({ columnId, title, description, labelColor, deadline }) => {
    const optimisticTask = {
      id: createTempId('card'),
      title,
      description,
      labelColor,
      deadline,
      columnId,
    };

    closeTaskModal();
    updateActiveBoard((board) => ({
      ...board,
      columns: board.columns.map((column) =>
        column.id === columnId
          ? { ...column, cards: [...(column.cards || []), optimisticTask] }
          : column,
      ),
    }));

    try {
      const updatedBoard = await requestBoardJson(
        `/boards/${activeBoardId}/columns/${columnId}/cards`,
        { method: 'POST', body: { title, description, labelColor, deadline } },
        token,
      );

      setBoards((currentBoards) =>
        currentBoards.map((board) => (board.id === activeBoardId ? updatedBoard : board)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async ({ id, columnId, title, description, labelColor, deadline }) => {
    closeTaskModal();
    updateActiveBoard((board) => ({
      ...board,
      columns: board.columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: (column.cards || []).map((card) =>
                card.id === id
                  ? { ...card, title, description, labelColor, deadline, columnId }
                  : card,
              ),
            }
          : column,
      ),
    }));

    try {
      const updatedBoard = await requestBoardJson(
        `/boards/${activeBoardId}/columns/${columnId}/cards/${id}`,
        { method: 'PATCH', body: { title, description, labelColor, deadline } },
        token,
      );

      setBoards((currentBoards) =>
        currentBoards.map((board) => (board.id === activeBoardId ? updatedBoard : board)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async ({ id, columnId }) => {
    updateActiveBoard((board) => ({
      ...board,
      columns: board.columns.map((column) =>
        column.id === columnId
          ? { ...column, cards: (column.cards || []).filter((card) => card.id !== id) }
          : column,
      ),
    }));

    try {
      const updatedBoard = await requestBoardJson(
        `/boards/${activeBoardId}/columns/${columnId}/cards/${id}`,
        { method: 'DELETE' },
        token,
      );

      setBoards((currentBoards) =>
        currentBoards.map((board) => (board.id === activeBoardId ? updatedBoard : board)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const moveTask = async (task, targetColumnId) => {
    if (task.columnId === targetColumnId) return;

    updateActiveBoard((board) => ({
      ...board,
      columns: board.columns.map((column) => {
        if (column.id === task.columnId) {
          return { ...column, cards: (column.cards || []).filter((card) => card.id !== task.id) };
        }

        if (column.id === targetColumnId) {
          return { ...column, cards: [...(column.cards || []), { ...task, columnId: targetColumnId }] };
        }

        return column;
      }),
    }));

    try {
      const updatedBoard = await requestBoardJson(
        `/boards/${activeBoardId}/columns/${task.columnId}/cards/${task.id}/move`,
        { method: 'PATCH', body: { targetColumnId } },
        token,
      );

      setBoards((currentBoards) =>
        currentBoards.map((board) => (board.id === activeBoardId ? updatedBoard : board)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    boards,
    activeBoard,
    activeBoardId,
    isLoadingBoards,
    setActiveBoardId,
    openCreateBoard,
    openEditBoard,
    deleteBoard,
    openCreateColumn,
    openEditColumn,
    deleteColumn,
    openCreateTask,
    openEditTask,
    deleteTask,
    moveTask,
    openFilters,
    selectedFilter,
    setSelectedFilter,
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
      {taskModal.isOpen && (
        <TaskModal
          key={`${taskModal.mode}-${taskModal.columnId}-${taskModal.task?.id || 'new'}`}
          mode={taskModal.mode}
          columnId={taskModal.columnId}
          task={taskModal.task}
          onClose={closeTaskModal}
          onCreate={createTask}
          onUpdate={updateTask}
        />
      )}
      {isFiltersOpen && (
        <FiltersModal
          selectedFilter={selectedFilter}
          onChange={setSelectedFilter}
          onClose={closeFilters}
        />
      )}
    </BoardWorkspaceContext.Provider>
  );
}
