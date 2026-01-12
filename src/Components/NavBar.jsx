import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/Logo.png";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut().catch((err) => console.log(err.message));
  };

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-lg font-semibold transition 
     ${isActive ? "text-primary" : "hover:text-primary"}
     text-gray-800 dark:text-gray-100`;

  return (
    <div className="navbar bg-white dark:bg-gray-900 shadow-md px-4 lg:px-10 sticky top-0 z-50">
      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box shadow-md mt-3 w-60 p-3 z-[100]"
          >
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/meals" className={navLinkClass}>
                Meals
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>

            {user ? (
              <>
                <li>
                  <NavLink to="/dashboard" className={navLinkClass}>
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/favorite" className={navLinkClass}>
                    Favorites
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="text-red-500 font-semibold px-4 py-2"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
          <span className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white">
            GhoreyRanna
          </span>
        </Link>
      </div>

      {/* CENTER (Desktop Navbar) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/meals" className={navLinkClass}>
              Meals
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-orders" className={navLinkClass}>
                  My Orders
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end  flex items-center gap-3">
        <button
          onClick={handleThemeToggle}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
          title={
            theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
          }
        >
          {theme === "light" ? (
            <FaMoon className="text-gray-800" />
          ) : (
            <FaSun className="text-yellow-400" />
          )}
        </button>

        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="cursor-pointer">
              <img
                src={user.photoURL || "https://i.ibb.co/K0s5Lq7/user.png"}
                alt="user"
                className="w-10 h-10 rounded-full object-cover border-2 border-primary shadow-sm hover:scale-105 transition"
              />
            </label>

            <ul
              tabIndex={0}
              className="dropdown-content menu p-3 shadow bg-white dark:bg-gray-800 rounded-box w-52"
            >
              <li className="font-semibold text-gray-700 dark:text-gray-200">
                {user.displayName || "User"}
              </li>
              <li>
                <NavLink to="/dashboard/user-profile">Profile</NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="text-red-500 font-semibold"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-primary px-6 text-white">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default NavBar;
