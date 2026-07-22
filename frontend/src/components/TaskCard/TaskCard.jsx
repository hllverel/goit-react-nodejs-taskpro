import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onMoveColumn }) => {
  const { title, description, labelColor, deadline } = task || {};

  // Öncelik etiketlerinin ekrandaki yazı karşılıkları
  const priorityLabels = {
    blue: 'Low',
    pink: 'Medium',
    green: 'High',
    gray: 'Without',
  };

  const showBell = labelColor !== 'gray';

  return (
    <div className="task-card">
      <div className={`card-label-line ${labelColor}`}></div>

      <div className="card-content">
        <div className="card-header">
          <h3>{title || 'Untitled Task'}</h3>
        </div>

        {/* Card Description */}
        <p className="card-description">
          {description || 'No description provided.'}
        </p>

        {/* Card Footer */}
        <div className="card-footer">
          <div className="divider-line"></div>

          <div className="footer-bottom-row">
            <div className="footer-meta-info">
              <div className="meta-item">
                <span className="meta-label">Priority</span>
                <div className="priority-value-wrapper">
                  <span className={`priority-circle ${labelColor}`}></span>
                  <span className="priority-text">
                    {priorityLabels[labelColor] || 'Without'}
                  </span>
                </div>
              </div>

              <div className="meta-item">
                <span className="meta-label">Deadline</span>
                <span className="meta-value">{deadline || '12/05/2023'}</span>
              </div>
            </div>

            <div
              className="card-actions"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {/* Zil İkonu/Koşullu  */}
              {showBell && (
                <div
                  className="bell-icon-wrapper"
                  style={{
                    color: '#bedbb0',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title="Deadline Alert"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 14C8.73333 14 9.35556 13.7444 9.86667 13.2333C10.3778 12.7222 10.6333 12.1 10.6333 11.3667H5.36667C5.36667 12.1 5.62222 12.7222 6.13333 13.2333C6.64444 13.7444 7.26667 14 8 14ZM2.66667 10.3333V9.16667L4 7.83333V5C4 4.02222 4.31667 3.16667 4.95 2.43333C5.58333 1.7 6.36667 1.28889 7.3 1.18889V0.666667H8.7V1.18889C9.63333 1.28889 10.4167 1.7 11.05 2.43333C11.6833 3.16667 12 4.02222 12 5V7.83333L13.3333 9.16667V10.3333H2.66667Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              )}

              {/* Move Butonu */}
              <button
                className="action-btn move-btn"
                onClick={() => onMoveColumn && onMoveColumn(task)}
                title="Move to column"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM10.293 8.70711L8.5 10.5V8.5H5.5V7.5H8.5V5.5L10.293 7.29289C10.6835 7.68342 10.6835 8.31658 10.293 8.70711Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Düzenleme/Kalem Butonu */}
              <button
                className="action-btn edit-btn"
                onClick={() => onEdit(task)}
                title="Edit task"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6569 1.34315C13.4379 0.562102 14.7043 0.562103 15.4853 1.34315C16.2663 2.12419 16.2663 3.39052 15.4853 4.17157L5.17157 14.4853C4.84333 14.8135 4.42841 15.0416 3.97126 15.1455L0.828427 15.8596C0.457816 15.9438 0.143779 15.6298 0.228001 15.2592L0.942111 12.1163C1.04603 11.6592 1.27412 11.2443 1.60236 10.916L11.9161 0.602234L12.6569 1.34315ZM12.6569 1.34315L14.6569 3.34315"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Silme/Çöp Kutusu Butonu */}
              <button
                className="action-btn delete-btn"
                onClick={() => onDelete(task.id)}
                title="Delete task"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 4H13.5M5.5 4V2.5C5.5 2.10218 5.65804 1.72064 5.93929 1.43934C6.22054 1.15804 6.60218 1 7 1H9C9.39782 1 9.77936 1.15804 10.0607 1.43934C10.342 1.72064 10.5 2.10218 10.5 2.5V4M12 4V13.5C12 13.8978 11.842 14.2794 11.5607 14.5607C11.2794 14.842 10.8978 15 10.5 15H5.5C5.10218 15 4.72064 14.842 4.43934 14.5607C4.15804 14.2794 4 13.8978 4 13.5V4H12Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
