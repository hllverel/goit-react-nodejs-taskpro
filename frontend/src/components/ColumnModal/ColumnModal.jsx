import { useEffect, useState } from 'react';
import './ColumnModal.css';

function ColumnModal({ mode, column, onClose, onCreate, onUpdate }) {
  const [title, setTitle] = useState(column?.title || '');

  const isEditMode = mode === 'edit';
  const trimmedTitle = title.trim();

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
    if (!trimmedTitle) return;

    if (isEditMode && column) {
      onUpdate({ id: column.id, title: trimmedTitle });
      return;
    }

    onCreate({ title: trimmedTitle });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <form
        className="column-modal"
        aria-label={isEditMode ? 'Edit column' : 'Add column'}
        onSubmit={handleSubmit}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close-button" type="button" aria-label="Close modal" onClick={onClose}>
          <svg aria-hidden="true">
            <use href="/icons.svg#icon-close" />
          </svg>
        </button>

        <h2 className="column-modal-title">{isEditMode ? 'Edit column' : 'Add column'}</h2>

        <label className="visually-hidden" htmlFor="column-title">
          Column title
        </label>
        <input
          id="column-title"
          className="column-modal-input"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          autoFocus
        />

        <button className="column-modal-submit" type="submit" disabled={!trimmedTitle}>
          <span className="submit-icon" aria-hidden="true">
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

export default ColumnModal;
