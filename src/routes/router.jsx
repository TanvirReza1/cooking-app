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
import OrderPage from "../Pages/OrderPage";
import UserProfile from "../Pages/DashBoard/UserDashboard/UserProfile";
import MyOrders from "../Pages/DashBoard/UserDashboard/MyOrders";
import MyReview from "../Pages/DashBoard/UserDashboard/MyReview";
import FavoriteMeals from "../Pages/DashBoard/UserDashboard/FavoriteMeals";
import OrderRequests from "../Pages/DashBoard/ChefDashboard/OrderRequests";
import AdminRoute from "./AdminRoute ";
import ManageUsers from "../Pages/DashBoard/AdminDashBoard/ManageUsers";
import ManageRequests from "../Pages/AdminDashboard/ManageRequests";
import PaymentSuccess from "../Pages/PaymentSuccess";
import PlatformStatistics from "../Pages/DashBoard/AdminDashBoard/PlatformStatistics";
import ErrorPage from "../ErrorPage";

const router = createBrowserRouter([
  // MAIN LAYOUT
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
      {
        path: "orderpage/:id",
        element: (
          <PrivateRoute>
            <OrderPage></OrderPage>
          </PrivateRoute>
        ),
      },
    ],
  },

  // AUTH LAYOUT (FIXED)
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LogIn /> },
      { path: "registration", element: <Registration /> },
    ],
  },

  // PUBLIC MAIN ROUTES
  {
    path: "payment-success/:orderId",
    element: (
      <PrivateRoute>
        <PaymentSuccess />
      </PrivateRoute>
    ),
  },

  // DASHBOARD
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "create-meal", element: <CreateMeal /> },
      {
        path: "user-profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "my-reviews",
        element: <MyReview />,
      },
      {
        path: "favorite",
        element: <FavoriteMeals></FavoriteMeals>,
      },
      {
        path: "order-requests",
        element: <OrderRequests></OrderRequests>,
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-requests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageRequests></ManageRequests>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/statistics",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <PlatformStatistics />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
