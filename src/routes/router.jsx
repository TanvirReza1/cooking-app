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

const router = createBrowserRouter([
  // main Layout
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "home",
        Component: Home,
      },
      {
        path: "meals",
        Component: MealsPage,
      },
    ],
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
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "create-meal",
        element: <CreateMeal></CreateMeal>,
      },
    ],
  },
]);
export default router;
