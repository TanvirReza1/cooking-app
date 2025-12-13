import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MealsPage = () => {
  const axiosSecure = useAxiosSecure();

  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const limit = 10;

  // ===== FETCH MEALS WITH PAGINATION =====
  const { data, isLoading, error } = useQuery({
    queryKey: ["meals", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const meals = data?.meals || [];
  const totalPages = data?.totalPages || 1;

  // ===== SORT BY PRICE =====
  const sortedMeals = [...meals].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  if (isLoading)
    return <p className="text-center text-xl py-20">Loading meals...</p>;

  if (error)
    return (
      <p className="text-center text-red-500 py-20">
        Failed to load meals. Try again later.
      </p>
    );

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
        <h2 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
          Today’s Special Meals
        </h2>

        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-6 py-2 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition"
        >
          Sort by Price {sortOrder === "asc" ? "⬆" : "⬇"}
        </button>
      </div>

      {/* ===== MEALS GRID ===== */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {sortedMeals.map((meal) => (
          <motion.div
            key={meal._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-xl rounded-2xl overflow-hidden border hover:shadow-2xl transition"
          >
            <img
              src={meal.foodImage}
              alt={meal.foodName}
              className="h-44 sm:h-56 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="text-2xl font-bold">{meal.foodName}</h3>

              <p className="text-gray-600 text-sm mt-1">
                Chef:{" "}
                <span className="font-medium">
                  {meal.chefName || "Unknown"}
                </span>
              </p>

              <p className="text-gray-500 text-sm">
                Delivery Area: {meal.deliveryArea || "Not Provided"}
              </p>

              <p className="text-sm mt-2 font-semibold">
                ⭐ Rating: {meal.rating || 0}/5
              </p>

              <p className="text-xl font-bold text-purple-700 mt-3">
                ${meal.price}
              </p>

              <Link
                to={`/view-details/${meal._id}`}
                className="mt-4 block text-center w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition shadow-md"
              >
                See Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===== PAGINATION ===== */}
      <div className="flex justify-center gap-2 mt-12 flex-wrap">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`px-4 py-2 rounded-lg border transition
              ${
                page === num + 1
                  ? "bg-purple-600 text-white"
                  : "bg-white hover:bg-purple-100"
              }`}
          >
            {num + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default MealsPage;
