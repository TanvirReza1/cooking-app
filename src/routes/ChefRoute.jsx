// src/Private/ChefRoute.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ChefRoute = ({ children, fallback = null }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user profile securely from backend
  const { data: profile, isLoading } = useQuery({
    queryKey: ["chef-profile"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user, // run only when user exists
  });

  if (isLoading)
    return <div className="p-8 text-center">Checking access...</div>;

  // Allow if chef (or admin if you want)
  if (profile?.role === "chef" || profile?.role === "admin") {
    return children ?? <Outlet />;
  }

  // Forbidden view (same style as AdminRoute)
  return (
    <div className="p-8 text-center text-red-600">
      Access denied — chef only.
    </div>
  );
};

export default ChefRoute;
