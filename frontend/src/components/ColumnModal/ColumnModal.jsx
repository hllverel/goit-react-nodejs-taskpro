import { useState } from 'react';
import './ColumnModal.css';

function ColumnModal({ mode, column, onClose, onCreate, onUpdate }) {
  const [title, setTitle] = useState(column?.title || '');

  const isEditMode = mode === 'edit';
  const trimmedTitle = title.trim();

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
          <span aria-hidden="true">x</span>
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
          <span className="submit-icon" aria-hidden="true">+</span>
          {isEditMode ? 'Edit' : 'Add'}
        </button>
      </form>
    </div>
  );
}

export default ColumnModal;
