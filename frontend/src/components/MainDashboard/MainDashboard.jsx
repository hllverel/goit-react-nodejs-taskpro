import './MainDashboard.css';
import { useState } from 'react';
import Loader from '../Loader/Loader.jsx';
import TaskCard from '../TaskCard/TaskCard.jsx';
import { useBoardWorkspace } from '../BoardWorkspace/useBoardWorkspace.js';

function MainDashboard() {
    const {
      activeBoard,
      isLoadingBoards,
      openCreateColumn,
      openEditColumn,
      deleteColumn,
      openCreateTask,
      openEditTask,
      deleteTask,
      moveTask,
      selectedFilter,
    } = useBoardWorkspace();

    const [draggedTask, setDraggedTask] = useState(null);
    const [dropColumnId, setDropColumnId] = useState(null);
    const columns = activeBoard?.columns || [];

    const handleTaskDragStart = (event, task) => {
      setDraggedTask(task);
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', task.id);
    };

    const handleTaskDrop = (event, targetColumnId) => {
      event.preventDefault();

      if (draggedTask && draggedTask.columnId !== targetColumnId) {
        moveTask(draggedTask, targetColumnId);
      }

      setDraggedTask(null);
      setDropColumnId(null);
    };

    if (isLoadingBoards) {
      return (
        <main className="main-dashboard main-dashboard-empty">
          <Loader label="Loading boards" />
        </main>
      );
    }

    if (!activeBoard) {
      return (
        <main className="main-dashboard main-dashboard-empty">
          <p className="empty-dashboard-text">
            Before starting your project, it is essential to create a board to visualize
            and track all the necessary tasks and milestones. This board serves as a
            powerful tool to organize the workflow and ensure effective collaboration
            among team members.
          </p>
        </main>
      );
    }

    return (
      <main className="main-dashboard">
        <div className="columns-scroll-area" aria-label={`${activeBoard?.title || 'Board'} columns`}>
          <div className="columns-track">
            {columns.map((column) => (
              <section className="task-column" key={column.id}>
                <header className="task-column-header">
                  <h2>{column.title}</h2>
                  <div className="task-column-actions">
                    <button
                      type="button"
                      aria-label={`Edit ${column.title}`}
                      onClick={() => openEditColumn(column)}
                    >
                      <svg aria-hidden="true">
                        <use href="/icons.svg#icon-edit" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${column.title}`}
                      onClick={() => deleteColumn(column.id)}
                    >
                      <svg aria-hidden="true">
                        <use href="/icons.svg#icon-trash" />
                      </svg>
                    </button>
                  </div>
                </header>

                <div className="task-column-body">
                  <div
                    className={`task-cards-list ${
                      dropColumnId === column.id && draggedTask?.columnId !== column.id
                        ? 'is-drop-target'
                        : ''
                    }`}
                    onDragOver={(event) => {
                      event.preventDefault();
                      event.dataTransfer.dropEffect = 'move';
                      setDropColumnId(column.id);
                    }}
                    onDragLeave={() => setDropColumnId(null)}
                    onDrop={(event) => handleTaskDrop(event, column.id)}
                  >
                    {(column.cards || [])
                      .filter((task) => selectedFilter === 'all' || task.labelColor === selectedFilter)
                      .map((task) => (
                      <TaskCard
                        key={task.id}
                        task={{ ...task, columnId: column.id }}
                        columns={columns}
                        onEdit={(selectedTask) => openEditTask(column.id, selectedTask)}
                        onDelete={deleteTask}
                        onMove={moveTask}
                        onDragStart={handleTaskDragStart}
                        onDragEnd={() => {
                          setDraggedTask(null);
                          setDropColumnId(null);
                        }}
                      />
                    ))}
                  </div>
                  <button
                    className="add-card-button"
                    type="button"
                    onClick={() => openCreateTask(column.id)}
                  >
                    <span className="add-card-icon" aria-hidden="true">
                      <svg>
                        <use href="/icons.svg#icon-plus" />
                      </svg>
                    </span>
                    Add another card
                  </button>
                </div>
              </section>
            ))}

            <button className="add-column-button" type="button" onClick={openCreateColumn}>
              <span className="add-column-icon" aria-hidden="true">
                <svg>
                  <use href="/icons.svg#icon-plus" />
                </svg>
              </span>
              Add another column
            </button>
          </div>
        </div>
      </main>
  );
}

export default MainDashboard;
