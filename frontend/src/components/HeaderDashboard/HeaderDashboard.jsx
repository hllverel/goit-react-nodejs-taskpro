import './HeaderDashboard.css';
import { useBoardWorkspace } from '../BoardWorkspace/useBoardWorkspace.js';

function HeaderDashboard() {
    const { activeBoard, openFilters } = useBoardWorkspace();

    return (
      <div className="header-dashboard">
        {activeBoard && <h1>{activeBoard.title}</h1>}
        <button className="filters-button" type="button" onClick={openFilters}>
          <svg className="filters-icon" aria-hidden="true">
            <use href="/icons.svg#icon-filter" />
          </svg>
          Filters
        </button>
      </div>
  );
}

export default HeaderDashboard;
