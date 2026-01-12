import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaCartArrowDown, FaUser } from "react-icons/fa";
import { FiMenu, FiInbox, FiHome } from "react-icons/fi";
import {
  MdAddCircle,
  MdBarChart,
  MdDashboard,
  MdFastfood,
  MdFavorite,
  MdGroups2,
  MdManageAccounts,
  MdRateReview,
} from "react-icons/md";
import useRole from "../../hooks/useRole";

const Dashboard = () => {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* MAIN CONTENT */}
        <div className="drawer-content flex flex-col">
          <nav className="navbar bg-base-300 shadow-md px-4">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <FiMenu size={22} />
            </label>

            <h2 className="text-xl font-bold tracking-wide">Dashboard Panel</h2>
          </nav>

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
              {/* ⭐ COMMON FOR ALL USERS */}

              <li>
                <Link
                  to="/dashboard/user-profile"
                  className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
                >
                  <FaUser size={18} />
                  <span>User Profile</span>
                </Link>
              </li>

              {/* ⭐ USER ONLY */}
              {role === "user" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/my-orders"
                      className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
                    >
                      <FaCartArrowDown size={18} />
                      <span>My Orders</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/my-reviews"
                      className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
                    >
                      <MdRateReview size={18} />
                      <span>My Reviews</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/favorite"
                      className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
                    >
                      <MdFavorite size={18} />
                      <span>My Favorite</span>
                    </Link>
                  </li>
                </>
              )}

              {/* ⭐ CHEF ONLY */}
              {role === "chef" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/create-meal"
                      className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
                    >
                      <MdAddCircle size={18} />
                      <span>Create Meal</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/order-requests"
                      className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
                    >
                      <FiInbox size={18} />
                      <span>Order Requests</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/my-meals"
                      className="flex items-center gap-3 rounded-lg hover:bg-base-300 transition-all"
                    >
                      <MdFastfood size={18} />
                      <span>My Meals</span>
                    </Link>
                  </li>
                </>
              )}

              {/* ⭐ ADMIN ONLY */}
              {role === "admin" && (
                <>
                  <li>
                    <Link
                      to="/dashboard/manage-users"
                      className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
                    >
                      <MdManageAccounts size={18} />
                      <span>Manage Users</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/manage-requests"
                      className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
                    >
                      <MdGroups2 size={18} />
                      <span>Manage Requests</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/statistics"
                      className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
                    >
                      <MdBarChart size={18} />
                      <span>Statistics</span>
                    </Link>
                  </li>
                </>
              )}

              <div className="divider"></div>

              {/* Homepage — visible for everybody */}
              <Link to="/home">
                <button className="flex items-center gap-3 rounded-lg hover:bg-base-300 transition-all">
                  <FiHome size={18} />
                  <span>Homepage</span>
                </button>
              </Link>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
