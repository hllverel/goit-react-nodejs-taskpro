import { useEffect } from 'react';
import './FiltersModal.css';

const filterOptions = [
  { id: 'gray', label: 'Without priority' },
  { id: 'blue', label: 'Low' },
  { id: 'pink', label: 'Medium' },
  { id: 'green', label: 'High' },
];

function FiltersModal({ selectedFilter, onChange, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop filters-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="filters-modal" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close-button" type="button" aria-label="Close filters" onClick={onClose}>
          <svg aria-hidden="true">
            <use href="/icons.svg#icon-close" />
          </svg>
        </button>
        <h2>Filters</h2>
        <div className="filters-divider" />
        <div className="filters-heading">
          <h3>Label color</h3>
          <button type="button" onClick={() => onChange('all')}>
            Show all
          </button>
        </div>
        <div className="filters-options">
          {filterOptions.map((option) => (
            <button
              className={`filters-option ${selectedFilter === option.id ? 'is-selected' : ''}`}
              type="button"
              key={option.id}
              onClick={() => onChange(option.id)}
            >
              <span className={`filters-dot ${option.id}`} />
              {option.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default FiltersModal;
