import Header from "../components/Header/Header.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import MainDashboard from "../components/MainDashboard/MainDashboard.jsx";
import { BoardWorkspaceProvider } from "../components/BoardWorkspace/BoardWorkspaceContext.jsx";

function HomePage() {
    return (
      <BoardWorkspaceProvider>
        <div className="taskpro-layout">
          <Sidebar />
          <div className="taskpro-content">
            <Header />
            <MainDashboard />
          </div>
        </div>
      </BoardWorkspaceProvider>
  );
}

export default HomePage;
