import React from "react";
import logo from "../assets/Logo.png";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err.message));
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className="px-4 py-2 rounded-lg text-lg font-semibold hover:text-primary transition"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/meals"
          className="px-4 py-2 rounded-lg text-lg font-semibold hover:text-primary transition"
        >
          Meals
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white shadow-md px-4 lg:px-10 sticky top-0 z-50">
      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
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
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box shadow-md mt-3 w-56 p-3 z-[100]"
          >
            {links}
            {user && (
              <li>
                <NavLink to="/dashBoard" className="font-semibold mt-2">
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img className="w-10 h-10 rounded-full" src={logo} alt="logo" />
          <span className="text-2xl font-bold tracking-wide">GhoreyRanna</span>
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-3">{links}</ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-4">
            <Link
              to="/dashBoard"
              className="hidden lg:block px-5 py-2 font-semibold hover:text-primary transition"
            >
              Dashboard
            </Link>

            {/* User Avatar */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer">
                <img
                  src={user.photoURL || "https://i.ibb.co/K0s5Lq7/user.png"}
                  className="w-10 h-10 rounded-full border"
                />
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-3 shadow bg-white rounded-box w-52"
              >
                <li>
                  <span className="font-semibold">
                    {user.displayName || "User"}
                  </span>
                </li>
                <li>
                  <button className="text-red-600" onClick={handleLogOut}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link
            to="/logIn"
            className="btn btn-primary px-6 text-white hidden lg:flex"
          >
            Login
          </Link>
        )}

        {/* Mobile login button */}
        {!user && (
          <Link
            to="/logIn"
            className="lg:hidden px-4 py-2 rounded-lg font-semibold"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
