import { useEffect, useState } from 'react';
import './TaskModal.css';

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
const dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const toDateInputValue = (value) => {
  if (!value) return new Date().toISOString().slice(0, 10);

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toISOString().slice(0, 10);
};

const toLocalDateValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const formatDeadlineLabel = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return 'Select date';

  const today = new Date();
  const dayLabel = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  if (date.toDateString() === today.toDateString()) {
    return `Today, ${dayLabel}`;
  }

  return dayLabel;
};

const getCalendarDays = (monthDate) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const offset = (firstDay.getDay() + 6) % 7;
  const days = [];

  for (let index = 0; index < offset; index += 1) {
    days.push({ date: new Date(year, month, index - offset + 1), isCurrentMonth: false });
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push({ date: new Date(year, month, day), isCurrentMonth: true });
  }

  while (days.length % 7 !== 0) {
    const nextDay = days.length - offset - lastDay.getDate() + 1;
    days.push({ date: new Date(year, month + 1, nextDay), isCurrentMonth: false });
  }

  return days;
};

function TaskModal({ mode = 'create', columnId, task, onClose, onCreate, onUpdate }) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [labelColor, setLabelColor] = useState(task?.labelColor || 'gray');
  const [deadline, setDeadline] = useState(toDateInputValue(task?.deadline));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => new Date(toDateInputValue(task?.deadline)));

  const isEditMode = mode === 'edit';
  const isValid = title.trim() && description.trim() && deadline;
  const todayValue = toLocalDateValue(new Date());
  const calendarDays = getCalendarDays(calendarMonth);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) return;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      labelColor,
      deadline,
      columnId,
    };

    if (isEditMode && task) {
      onUpdate({ ...payload, id: task.id });
      return;
    }

    onCreate(payload);
  };

  const handleMonthChange = (direction) => {
    setCalendarMonth((currentMonth) => {
      const nextMonth = new Date(currentMonth);
      nextMonth.setMonth(currentMonth.getMonth() + direction);
      return nextMonth;
    });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <form
        className="task-modal"
        aria-label={isEditMode ? 'Edit card' : 'Add card'}
        onMouseDown={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <button className="modal-close-button" type="button" aria-label="Close modal" onClick={onClose}>
          <svg aria-hidden="true">
            <use href="/icons.svg#icon-close" />
          </svg>
        </button>

        <h2>{isEditMode ? 'Edit card' : 'Add card'}</h2>

        <label className="visually-hidden" htmlFor="task-title">
          Card title
        </label>
        <input
          id="task-title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          autoFocus
          required
        />

        <label className="visually-hidden" htmlFor="task-description">
          Card description
        </label>
        <textarea
          id="task-description"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />

        <fieldset className="task-modal-fieldset">
          <legend>Label color</legend>
          <div className="task-color-options">
            {['blue', 'pink', 'green', 'gray'].map((color) => (
              <button
                className={`task-color-dot ${color} ${labelColor === color ? 'is-selected' : ''}`}
                type="button"
                key={color}
                aria-label={color}
                aria-pressed={labelColor === color}
                onClick={() => setLabelColor(color)}
              />
            ))}
          </div>
        </fieldset>

        <label className="task-deadline-label" htmlFor="task-deadline">
          Deadline
        </label>
        <div className="task-date-picker">
          <button
            id="task-deadline"
            className="task-date-trigger"
            type="button"
            aria-expanded={isCalendarOpen}
            onClick={() => setIsCalendarOpen((isOpen) => !isOpen)}
          >
            {formatDeadlineLabel(deadline)}
            <svg className={isCalendarOpen ? 'is-open' : ''} aria-hidden="true">
              <use href="/icons.svg#icon-chevron-down" />
            </svg>
          </button>
          {isCalendarOpen && (
            <div className="task-calendar">
              <div className="task-calendar-header">
                <button type="button" aria-label="Previous month" onClick={() => handleMonthChange(-1)}>
                  <svg aria-hidden="true">
                    <use href="/icons.svg#icon-chevron-down" />
                  </svg>
                </button>
                <strong>{monthFormatter.format(calendarMonth)}</strong>
                <button type="button" aria-label="Next month" onClick={() => handleMonthChange(1)}>
                  <svg aria-hidden="true">
                    <use href="/icons.svg#icon-chevron-down" />
                  </svg>
                </button>
              </div>
              <div className="task-calendar-weekdays">
                {dayNames.map((dayName) => (
                  <span key={dayName}>{dayName}</span>
                ))}
              </div>
              <div className="task-calendar-grid">
                {calendarDays.map(({ date, isCurrentMonth }) => {
                  const value = toLocalDateValue(date);
                  const isDisabled = value < todayValue;

                  return (
                    <button
                      className={`${isCurrentMonth ? '' : 'is-muted'} ${
                        value === deadline ? 'is-selected' : ''
                      }`}
                      type="button"
                      key={value}
                      disabled={isDisabled}
                      onClick={() => {
                        setDeadline(value);
                        setCalendarMonth(date);
                        setIsCalendarOpen(false);
                      }}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <button className="task-modal-submit" type="submit" disabled={!isValid}>
          <span aria-hidden="true">
            <svg>
              <use href="/icons.svg#icon-plus" />
            </svg>
          </span>
          {isEditMode ? 'Edit' : 'Add'}
        </button>
      </form>
    </div>
  );
}

export default TaskModal;
