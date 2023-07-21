import { Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

import { PATH_AUTH } from "./paths";

import AuthGuard from "../guards/AuthGuard";
import GuestGuard from "../guards/GuestGuard";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={"loading..."}>
      <Component {...props} />
    </Suspense>
  );

export default function Router() {
  return useRoutes([
    {
      path: "dashboard",
      element: (
        <AuthGuard>
          <Outlet />
        </AuthGuard>
      ),
      children: [
        {
          element: <Home />,
          index: true,
        },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },

    // Main Routes
    {
      path: "*",
      element: <Outlet />,
      children: [
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/",
      element: <Outlet />,
      children: [
        { element: <Navigate to={PATH_AUTH.login} replace />, index: true },
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const Register = Loadable(lazy(() => import("../pages/auth/Register")));

// DASHBOARD
const Home = Loadable(lazy(() => import("../pages/dashboard")));

// OTHERS

const NotFound = Loadable(lazy(() => import("../pages/notFound")));
