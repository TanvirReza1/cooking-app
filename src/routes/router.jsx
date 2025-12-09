import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Dashboard from "../Pages/DashBoard/Dashboard";
import Registration from "../Pages/Registration";
import AuthLayout from "../Layouts/AuthLayout";
import LogIn from "../Pages/LogIn";
import PrivateRoute from "../Private/PrivateRoute";
import CreateMeal from "../Pages/DashBoard/ChefDashboard/CreateMeal";
import Home from "../Pages/Home/Home";
import MealsPage from "../Pages/Meals";
import ViewDetails from "../Pages/Home/ViewDetails";

const router = createBrowserRouter([
  // MAIN LAYOUT
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "meals", element: <MealsPage /> },

      {
        path: "view-details/:id",
        element: (
          <PrivateRoute>
            <ViewDetails />
          </PrivateRoute>
        ),
      },
    ],
  },

  // AUTH LAYOUT (FIXED)
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LogIn /> },
      { path: "registration", element: <Registration /> },
    ],
  },

  // DASHBOARD
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [{ path: "create-meal", element: <CreateMeal /> }],
  },
]);

export default router;
