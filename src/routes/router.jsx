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
import SetTitle from "../Components/SetTitile";
import ChefRoute from "./ChefRoute";
import MyMeals from "../Pages/DashBoard/ChefDashboard/MyMeals";

const router = createBrowserRouter([
  // MAIN LAYOUT
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <SetTitle title="Home">
            <Home />
          </SetTitle>
        ),
      },
      {
        path: "home",
        element: (
          <SetTitle title="Home">
            <Home />
          </SetTitle>
        ),
      },
      {
        path: "meals",
        element: (
          <SetTitle title="Meals">
            <MealsPage />
          </SetTitle>
        ),
      },
      {
        path: "view-details/:id",
        element: (
          <PrivateRoute>
            <SetTitle title="View Details">
              <ViewDetails />
            </SetTitle>
          </PrivateRoute>
        ),
      },
      {
        path: "orderpage/:id",
        element: (
          <PrivateRoute>
            <SetTitle title="Order Page">
              <OrderPage></OrderPage>
            </SetTitle>
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
      {
        path: "login",
        element: (
          <SetTitle title="Login">
            <LogIn />
          </SetTitle>
        ),
      },
      {
        path: "registration",
        element: (
          <SetTitle title="Registration">
            <Registration />
          </SetTitle>
        ),
      },
    ],
  },

  // PUBLIC MAIN ROUTES
  {
    path: "payment-success/:orderId",
    element: (
      <PrivateRoute>
        <SetTitle title="Payment Success">
          <PaymentSuccess />
        </SetTitle>
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
      {
        path: "create-meal",
        element: (
          <PrivateRoute>
            <ChefRoute>
              <SetTitle title="Create Meal">
                <CreateMeal />
              </SetTitle>
            </ChefRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "user-profile",
        element: (
          <SetTitle title="User Profile">
            <UserProfile></UserProfile>
          </SetTitle>
        ),
      },
      {
        path: "my-orders",
        element: (
          <SetTitle title="My Orders">
            <MyOrders />
          </SetTitle>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <SetTitle title="My Reviews">
            <MyReview />
          </SetTitle>
        ),
      },
      {
        path: "favorite",
        element: (
          <SetTitle title="Favorite Meals">
            <FavoriteMeals></FavoriteMeals>
          </SetTitle>
        ),
      },
      {
        path: "order-requests",
        element: (
          <PrivateRoute>
            <ChefRoute>
              <SetTitle title="Order Requests">
                <OrderRequests></OrderRequests>
              </SetTitle>
            </ChefRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-meals",
        element: (
          <PrivateRoute>
            <ChefRoute>
              <SetTitle title="My Meals">
                <MyMeals />
              </SetTitle>
            </ChefRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <SetTitle title="Manage Users">
                <ManageUsers></ManageUsers>
              </SetTitle>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-requests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <SetTitle title="Manage Requests">
                <ManageRequests></ManageRequests>
              </SetTitle>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/statistics",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <SetTitle title="Platform Statistics">
                <PlatformStatistics />
              </SetTitle>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
