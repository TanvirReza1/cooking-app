import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Dashboard from "../Pages/DashBoard/Dashboard";
import Registration from "../Pages/Registration";
import AuthLayout from "../Layouts/AuthLayout";
import LogIn from "../Pages/LogIn";

const router = createBrowserRouter([
  // main Layout
  {
    path: "/",
    element: <MainLayout />,
    children: [],
  },

  // auth layout

  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "logIn",
        Component: LogIn,
      },
      {
        path: "registration",
        Component: Registration,
      },
    ],
  },

  {
    path: "dashBoard",
    element: <Dashboard></Dashboard>,
    children: [{}],
  },
]);
export default router;
