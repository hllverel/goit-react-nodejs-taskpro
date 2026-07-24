import { useEffect, useState } from 'react';
import BoardIcon from '../BoardIcon/BoardIcon.jsx';
import { boardBackgroundOptions, boardIconOptions } from '../BoardWorkspace/boardWorkspaceData.js';
import './BoardModal.css';

const colorEffectOptions = [
  { id: 'solid', label: 'Solid' },
  { id: 'linear', label: 'Linear' },
  { id: 'radial', label: 'Radial' },
];

const colorPresetOptions = ['#bedbb0', '#f16b6b', '#f7b7c9', '#7cc7ff', '#7c3aed', '#84cc16'];

const buildColorPreview = (color, effect) => {
  if (effect === 'solid') return color;
  if (effect === 'radial') {
    return `radial-gradient(circle at 35% 25%, ${color}, #151515 72%)`;
  }

  return `linear-gradient(135deg, ${color}, #151515)`;
};

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

  if (colors.length === 0) return '#8f8f8f';

  return colors.sort((firstColor, secondColor) =>
    getHexLuminance(secondColor) - getHexLuminance(firstColor),
  )[0];
};

const getColorEffectFromPreview = (preview) => {
  if (preview?.startsWith('radial-gradient')) return 'radial';
  if (preview?.startsWith('linear-gradient')) return 'linear';

  return 'solid';
};

function BoardModal({ mode, board, onClose, onCreate, onUpdate }) {
  const initialBackgroundOption =
    boardBackgroundOptions.find((option) => option.id === board?.backgroundId) ||
    boardBackgroundOptions[0];
  const [title, setTitle] = useState(board?.title || '');
  const [iconId, setIconId] = useState(board?.iconId || boardIconOptions[0].id);
  const [backgroundId, setBackgroundId] = useState(
    board?.backgroundId || initialBackgroundOption.id,
  );
  const [backgroundPreview, setBackgroundPreview] = useState(
    board?.backgroundPreview || initialBackgroundOption.preview,
  );
  const [customColor, setCustomColor] = useState(
    board?.backgroundPreview ? getBackgroundAccent(board.backgroundPreview) : '#bedbb0',
  );
  const [customEffect, setCustomEffect] = useState(getColorEffectFromPreview(board?.backgroundPreview));
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const isEditMode = mode === 'edit';
  const trimmedTitle = title.trim();
  const iconAccentColor = backgroundId === 'none' ? undefined : getBackgroundAccent(backgroundPreview);
  const customColorPreview = buildColorPreview(customColor, customEffect);

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

    const payload = { title: trimmedTitle, iconId, backgroundId, backgroundPreview };

    if (isEditMode && board) {
      onUpdate({ ...payload, id: board.id });
      return;
    }

    onCreate(payload);
  };

  const handleBackgroundSelect = (option) => {
    setBackgroundId(option.id);
    setBackgroundPreview(option.preview);
    setIsColorPickerOpen(false);
  };

  const handleCustomColorSelect = (color = customColor, effect = customEffect) => {
    setBackgroundId('custom-color');
    setBackgroundPreview(buildColorPreview(color, effect));
  };

  const handleColorChange = (event) => {
    const nextColor = event.target.value;

    setCustomColor(nextColor);
    handleCustomColorSelect(nextColor, customEffect);
  };

  const handleEffectChange = (effect) => {
    setCustomEffect(effect);
    handleCustomColorSelect(customColor, effect);
  };

  const handleImageChange = (event) => {
    const [file] = event.target.files;

    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      setBackgroundId('custom-image');
      setBackgroundPreview(`url("${reader.result}") center / cover no-repeat`);
      setIsColorPickerOpen(false);
    });

    reader.readAsDataURL(file);
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
          <svg aria-hidden="true">
            <use href="/icons.svg#icon-close" />
          </svg>
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
          <div className="board-icon-picker" style={{ '--board-icon-accent': iconAccentColor }}>
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
                onClick={() => handleBackgroundSelect(option)}
                style={{ background: option.preview }}
              />
            ))}
            <label
              className={`board-background-option board-background-tool ${
                backgroundId === 'custom-image' ? 'is-selected' : ''
              }`}
              aria-label="Upload background image"
              style={backgroundId === 'custom-image' ? { background: backgroundPreview } : undefined}
            >
              <input
                className="visually-hidden"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <svg aria-hidden="true">
                <use href="/icons.svg#icon-image" />
              </svg>
            </label>
            <div className="board-color-tool">
              <button
                className={`board-background-option board-background-tool ${
                  backgroundId === 'custom-color' ? 'is-selected' : ''
                }`}
                type="button"
                aria-label="Choose background color"
                aria-expanded={isColorPickerOpen}
                onClick={() => {
                  setIsColorPickerOpen((isOpen) => !isOpen);
                  handleCustomColorSelect();
                }}
                style={{ background: customColorPreview }}
              >
                <svg aria-hidden="true">
                  <use href="/icons.svg#icon-palette" />
                </svg>
              </button>
              {isColorPickerOpen && (
                <div className="board-color-popover">
                  <input
                    className="board-color-input"
                    type="color"
                    value={customColor}
                    onChange={handleColorChange}
                    aria-label="Custom background color"
                  />
                  <div className="board-color-presets" aria-label="Color presets">
                    {colorPresetOptions.map((color) => (
                      <button
                        className="board-color-preset"
                        type="button"
                        key={color}
                        aria-label={color}
                        onClick={() => {
                          setCustomColor(color);
                          handleCustomColorSelect(color, customEffect);
                        }}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="board-color-effects">
                    {colorEffectOptions.map((effect) => (
                      <button
                        className={`board-color-effect ${
                          customEffect === effect.id ? 'is-selected' : ''
                        }`}
                        type="button"
                        key={effect.id}
                        onClick={() => handleEffectChange(effect.id)}
                      >
                        {effect.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </fieldset>

        <button className="board-modal-submit" type="submit" disabled={!trimmedTitle}>
          <span className="submit-icon" aria-hidden="true">
            <svg>
              <use href="/icons.svg#icon-plus" />
            </svg>
          </span>
          {isEditMode ? 'Edit' : 'Create'}
        </button>
      </form>
    </div>
  );
}

export default BoardModal;
