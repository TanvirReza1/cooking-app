import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#E91E63"];

const PlatformStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["platform-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/statistics");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  const pieData = [
    { name: "Pending Orders", value: stats.ordersPending },
    { name: "Delivered Orders", value: stats.ordersDelivered },
  ];

  const barData = [
    {
      name: "Payment Amount",
      amount: stats.totalPaymentAmount,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Platform Statistics</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-4 bg-base-200 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
        </div>

        <div className="p-4 bg-base-200 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">Total Payments</h2>
          <p className="text-3xl font-bold mt-2">
            {stats.totalPaymentAmount} ৳
          </p>
        </div>

        <div className="p-4 bg-base-200 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">Pending Orders</h2>
          <p className="text-3xl font-bold mt-2">{stats.ordersPending}</p>
        </div>

        <div className="p-4 bg-base-200 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">Delivered Orders</h2>
          <p className="text-3xl font-bold mt-2">{stats.ordersDelivered}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Pie Chart */}
        <div className="bg-base-200 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Order Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-base-200 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Total Payments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PlatformStatistics;
