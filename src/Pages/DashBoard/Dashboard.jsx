import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaCartArrowDown, FaUser } from "react-icons/fa";
import { FiHome, FiSettings, FiMenu, FiInbox } from "react-icons/fi";
import {
  MdAddCircle,
  MdBarChart,
  MdFavorite,
  MdGroups2,
  MdManageAccounts,
  MdRateReview,
} from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          {/* NAVBAR */}
          <nav className="navbar bg-base-300 shadow-md px-4">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <FiMenu size={22} />
            </label>

            <h2 className="text-xl font-bold tracking-wide">Dashboard Panel</h2>
          </nav>

          {/* PAGE CONTENT */}
          <div className="p-6">
            <Outlet />
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            className="drawer-overlay cursor-pointer"
          ></label>

          <aside className="w-64 bg-base-200 border-r border-base-300 p-4 flex flex-col">
            <h3 className="text-lg font-semibold mb-6 px-2">Menu</h3>

            <ul className="menu text-base-content gap-2">
              {/* User Profile */}
              <li>
                <Link
                  to="/dashboard/user-profile"
                  className="flex items-center gap-3 rounded-lg hover:bg-base-300 transition-all"
                >
                  <FaUser size={18} />
                  <span>User Profile</span>
                </Link>
              </li>

              {/* My Orders */}
              <li>
                <Link
                  to="/dashboard/my-orders"
                  className="flex items-center gap-3 rounded-lg hover:bg-base-300 transition-all"
                >
                  <FaCartArrowDown size={18} />
                  <span>My Orders</span>
                </Link>
              </li>

              {/* my review */}
              <li>
                <Link
                  to="/dashboard/my-reviews"
                  className="flex items-center gap-3 rounded-lg hover:bg-base-300 transition-all"
                >
                  <MdRateReview size={18} />

                  <span>My Reviews</span>
                </Link>
              </li>

              {/* my favorite */}
              <li>
                <Link
                  to="/dashboard/favorite"
                  className="flex items-center gap-3 rounded-lg hover:bg-base-300 transition-all"
                >
                  <MdFavorite size={18} />

                  <span>My Favorite</span>
                </Link>
              </li>

              {/* Create Meal */}
              <li>
                <Link
                  to="/dashboard/create-meal"
                  className="flex items-center gap-3 rounded-lg hover:bg-base-300 transition-all"
                >
                  <MdAddCircle size={18} />
                  <span>Create Meal</span>
                </Link>
              </li>

              {/* Order Requests */}
              <li>
                <Link
                  to="/dashboard/order-requests"
                  className="flex items-center gap-3 rounded-lg hover:bg-base-300 transition-all"
                >
                  <FiInbox size={18} />
                  <span>Order Requests</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/manage-users"
                  className="flex items-center gap-3 rounded-lg hover:bg-base-300 transition-all"
                >
                  <MdGroups2 size={18} />

                  <span>Manage Users</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/manage-requests"
                  className="flex items-center gap-3 rounded-lg hover:bg-base-300 transition-all"
                >
                  <MdManageAccounts size={18} />
                  Manage Requests
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/statistics"
                  className="flex items-center gap-3 rounded-lg hover:bg-base-300 transition-all"
                >
                  <MdBarChart size={18} />
                  <span>Statistics</span>
                </Link>
              </li>

              <div className="divider"></div>

              {/* Home */}
              <Link to="/home">
                <button className="flex items-center gap-3 rounded-lg hover:bg-base-300 transition-all">
                  <FiHome size={18} />
                  <span>Homepage</span>
                </button>
              </Link>

              {/* Settings */}
              <li>
                <button className="flex items-center gap-3 rounded-lg hover:bg-base-300 transition-all">
                  <FiSettings size={18} />
                  <span>Settings</span>
                </button>
              </li>
            </ul>

            <div className="mt-auto pt-4">
              <p className="text-sm opacity-60 px-2">
                © {new Date().getFullYear()} Your App
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
