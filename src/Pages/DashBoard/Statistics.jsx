import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosSecure.get("/order-stats").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="bg-base-200 p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Orders Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="orders" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;
