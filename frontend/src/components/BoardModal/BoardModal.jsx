import { useState } from 'react';
import BoardIcon from '../BoardIcon/BoardIcon.jsx';
import { boardBackgroundOptions, boardIconOptions } from '../BoardWorkspace/boardWorkspaceData.js';
import './BoardModal.css';

function BoardModal({ mode, board, onClose, onCreate, onUpdate }) {
  const [title, setTitle] = useState(board?.title || '');
  const [iconId, setIconId] = useState(board?.iconId || boardIconOptions[0].id);
  const [backgroundId, setBackgroundId] = useState(
    board?.backgroundId || boardBackgroundOptions[0].id,
  );

  const isEditMode = mode === 'edit';
  const trimmedTitle = title.trim();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!trimmedTitle) return;

    const payload = { title: trimmedTitle, iconId, backgroundId };

    if (isEditMode && board) {
      onUpdate({ ...payload, id: board.id });
      return;
    }

    onCreate(payload);
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <form
        className="board-modal"
        aria-label={isEditMode ? 'Edit board' : 'New board'}
        onSubmit={handleSubmit}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close-button" type="button" aria-label="Close modal" onClick={onClose}>
          <span aria-hidden="true">x</span>
        </button>

        <h2 className="board-modal-title">{isEditMode ? 'Edit board' : 'New board'}</h2>

        <label className="visually-hidden" htmlFor="board-title">
          Board title
        </label>
        <input
          id="board-title"
          className="board-modal-input"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          autoFocus
        />

        <fieldset className="board-modal-fieldset">
          <legend>Icons</legend>
          <div className="board-icon-picker">
            {boardIconOptions.map((option) => (
              <button
                className={`board-icon-option ${iconId === option.id ? 'is-selected' : ''}`}
                type="button"
                key={option.id}
                aria-label={option.label}
                aria-pressed={iconId === option.id}
                onClick={() => setIconId(option.id)}
              >
                <BoardIcon iconId={option.id} size={22} />
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="board-modal-fieldset">
          <legend>Background</legend>
          <div className="board-background-picker">
            {boardBackgroundOptions.map((option) => (
              <button
                className={`board-background-option ${backgroundId === option.id ? 'is-selected' : ''}`}
                type="button"
                key={option.id}
                aria-label={option.label}
                aria-pressed={backgroundId === option.id}
                onClick={() => setBackgroundId(option.id)}
                style={{ background: option.preview }}
              />
            ))}
          </div>
        </fieldset>

        <button className="board-modal-submit" type="submit" disabled={!trimmedTitle}>
          <span className="submit-icon" aria-hidden="true">+</span>
          {isEditMode ? 'Edit' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default BoardModal;
