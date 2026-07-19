import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./PrivateRoutes.jsx";
import PublicRoute from "./PublicRoutes.jsx";

import AuthPage from "../pages/AuthPage.jsx"
import HomePage from "../pages/HomePage.jsx"
import ScreensPage from "../pages/ScreensPage.jsx"
import WelcomePage from "../pages/WelcomePage.jsx"

const AppRoutes = () => {
  return (
    <Routes>
        <Route
            path="/welcome"
            element={
            <PublicRoute>
                <WelcomePage />
            </PublicRoute>
            }
        />

        <Route
            path="/auth/:id"
            element={
            <PublicRoute>
                <AuthPage />
            </PublicRoute>
            }
        />

        <Route
            path="/home"
            element={
            <PrivateRoute>
                <HomePage />
            </PrivateRoute>
            }
        >
            {/* /home/:boardId renders ScreensPage inside HomePage's <Outlet /> */}

                <Route path=":boardId" element={<ScreensPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
};

export default AppRoutes;
