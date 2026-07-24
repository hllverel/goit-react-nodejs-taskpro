import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// import PrivateRoute from "./PrivateRoutes.jsx";
import PublicRoute from './PublicRoutes.jsx';

const AuthPage = lazy(() => import('../pages/AuthPage.jsx'));
const HomePage = lazy(() => import('../pages/HomePage.jsx'));
const ScreensPage = lazy(() => import('../pages/ScreensPage.jsx'));
const WelcomePage = lazy(() => import('../pages/WelcomePage.jsx'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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

        {/* <Route
              path="/home"
              element={
              <PrivateRoute>
                  <HomePage />
              </PrivateRoute>
              }
          > */}
        {/* /home/:boardId renders ScreensPage inside HomePage's <Outlet /> */}
        {/*
                  <Route path=":boardId" element={<ScreensPage />} />
          </Route> */}

        <Route path="/home" element={<HomePage />}>
          {/* /home/:boardId renders ScreensPage inside HomePage's <Outlet /> */}
          <Route path=":boardId" element={<ScreensPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
