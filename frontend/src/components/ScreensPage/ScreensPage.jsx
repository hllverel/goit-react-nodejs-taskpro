import './ScreensPage.css';
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard.jsx';
import MainDashboard from '../MainDashboard/MainDashboard.jsx';
import { boardBackgroundOptions } from '../BoardWorkspace/boardWorkspaceData.js';
import { useBoardWorkspace } from '../BoardWorkspace/useBoardWorkspace.js';

function ScreensPage() {
    const { activeBoard } = useBoardWorkspace();
    const boardBackground = boardBackgroundOptions.find(
      (background) => background.id === activeBoard?.backgroundId,
    );
    const dashboardBackground = activeBoard?.backgroundPreview || (boardBackground?.id === 'none'
      ? undefined
      : boardBackground?.preview);

    return (
      <section className="screens-page" style={{ '--board-dashboard-background': dashboardBackground }}>
        <HeaderDashboard />
        <MainDashboard />
      </section>
  );
}

export default ScreensPage;
