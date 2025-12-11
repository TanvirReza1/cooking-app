// src/Private/AdminRoute.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminRoute = ({ children, fallback = null }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // fetch user profile from backend to read role/status
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user,
  });

  if (isLoading)
    return <div className="p-8 text-center">Checking access...</div>;

  // if profile exists and role is admin, allow children
  if (profile?.role === "admin") {
    // render children or nested outlet
    return children ?? <Outlet />;
  }

  // otherwise forbidden
  return (
    <div className="p-8 text-center text-red-600">
      Access denied — admin only.
    </div>
  );
};

export default AdminRoute;
