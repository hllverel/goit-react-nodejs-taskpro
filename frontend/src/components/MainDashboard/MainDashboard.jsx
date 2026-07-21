import './MainDashboard.css';
import { useBoardWorkspace } from '../BoardWorkspace/useBoardWorkspace.js';

function MainDashboard() {
    const {
      activeBoard,
      openCreateColumn,
      openEditColumn,
      deleteColumn,
    } = useBoardWorkspace();

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
        <div className="dashboard-title-row">
          <h1>{activeBoard.title}</h1>
          <button className="filters-button" type="button">
            <span aria-hidden="true">Y</span>
            Filters
          </button>
        </div>

        <div className="columns-scroll-area" aria-label={`${activeBoard.title} columns`}>
          <div className="columns-track">
            {activeBoard.columns.map((column) => (
              <section className="task-column" key={column.id}>
                <header className="task-column-header">
                  <h2>{column.title}</h2>
                  <div className="task-column-actions">
                    <button
                      type="button"
                      aria-label={`Edit ${column.title}`}
                      onClick={() => openEditColumn(column)}
                    >
                      <span aria-hidden="true">/</span>
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${column.title}`}
                      onClick={() => deleteColumn(column.id)}
                    >
                      <span aria-hidden="true">x</span>
                    </button>
                  </div>
                </header>

                <div className="task-column-body">
                  <p className="column-placeholder">Cards will be added by the card module.</p>
                </div>
              </section>
            ))}

            <button className="add-column-button" type="button" onClick={openCreateColumn}>
              <span className="add-column-icon" aria-hidden="true">+</span>
              Add another column
            </button>
          </div>
        </div>
      </main>
  );
}

export default MainDashboard;
