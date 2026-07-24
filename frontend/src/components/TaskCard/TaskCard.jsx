import { useState } from 'react';
import './TaskCard.css';

const priorityLabels = {
  blue: 'Low',
  pink: 'Medium',
  green: 'High',
  gray: 'Without',
};

const isToday = (deadline) => {
  if (!deadline) return false;

  const today = new Date();
  const deadlineDate = new Date(deadline);

  return today.toDateString() === deadlineDate.toDateString();
};

const formatDeadline = (deadline) => {
  if (!deadline) return '';

  const deadlineDate = new Date(deadline);

  if (Number.isNaN(deadlineDate.getTime())) return deadline;

  return deadlineDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
};

function TaskCard({ task, columns, onEdit, onDelete, onMove, onDragStart, onDragEnd }) {
  const [isMoveMenuOpen, setIsMoveMenuOpen] = useState(false);
  const availableColumns = columns.filter((column) => column.id !== task.columnId);

  return (
    <article
      className={`task-card task-card-${task.labelColor || 'gray'}`}
      draggable
      onDragStart={(event) => onDragStart(event, task)}
      onDragEnd={onDragEnd}
    >
      <div className="task-card-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>

        <div className="task-card-footer">
          <div className="task-card-meta">
            <div>
              <span>Priority</span>
              <strong>
                <i className={`task-priority-dot ${task.labelColor || 'gray'}`} />
                {priorityLabels[task.labelColor] || 'Without'}
              </strong>
            </div>
            <div>
              <span>Deadline</span>
              <strong>{formatDeadline(task.deadline)}</strong>
            </div>
          </div>

          <div className="task-card-actions">
            {isToday(task.deadline) && (
              <span className="task-card-alert" title="Deadline is today">
                <svg aria-hidden="true">
                  <use href="/icons.svg#icon-bell" />
                </svg>
              </span>
            )}
            <div className="task-move-wrap">
              <button
                type="button"
                aria-label={`Move ${task.title}`}
                onClick={() => setIsMoveMenuOpen((isOpen) => !isOpen)}
              >
                <svg aria-hidden="true">
                  <use href="/icons.svg#icon-move" />
                </svg>
              </button>
              {isMoveMenuOpen && availableColumns.length > 0 && (
                <div className="task-move-menu">
                  {availableColumns.map((column) => (
                    <button
                      type="button"
                      key={column.id}
                      onClick={() => {
                        onMove(task, column.id);
                        setIsMoveMenuOpen(false);
                      }}
                    >
                      <span>{column.title}</span>
                      <svg aria-hidden="true">
                        <use href="/icons.svg#icon-move" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button type="button" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)}>
              <svg aria-hidden="true">
                <use href="/icons.svg#icon-edit" />
              </svg>
            </button>
            <button type="button" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task)}>
              <svg aria-hidden="true">
                <use href="/icons.svg#icon-trash" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
