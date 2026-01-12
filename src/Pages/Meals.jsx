import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

/* ================= SKELETON CARD ================= */
const MealSkeleton = () => (
  <div className=" rounded-2xl border shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-8 bg-gray-200 rounded mt-4" />
    </div>
  </div>
);

const MealsPage = () => {
  const axiosSecure = useAxiosSecure();

  /* ================= STATE ================= */
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [date, setDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const limit = 8;

  /* ================= DATA FETCH ================= */
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

  /* ================= FILTER + SORT ================= */
  const filteredMeals = meals
    .filter((meal) =>
      meal.foodName.toLowerCase().includes(search.toLowerCase())
    )
    .filter((meal) => (minPrice ? meal.price >= Number(minPrice) : true))
    .filter((meal) =>
      date ? new Date(meal.createdAt).toISOString().slice(0, 10) === date : true
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <h2 className="text-4xl font-extrabold ">Explore Our Meals</h2>
      </div>

      {/* ================= SEARCH & FILTER ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        {/* Search */}
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />

        {/* Price Filter */}
        <input
          type="number"
          placeholder="Minimum Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />

        {/* Date Filter */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />

        {/* Sorting */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => <MealSkeleton key={i} />)}

        {!isLoading &&
          filteredMeals.map((meal) => (
            <motion.div
              key={meal._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className=" rounded-2xl border shadow-md hover:shadow-xl transition overflow-hidden flex flex-col h-full"
            >
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="h-48 w-full object-cover"
              />

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold ">{meal.foodName}</h3>

                <p className=" text-sm mt-2 line-clamp-2">
                  {meal.description ||
                    "Delicious homemade meal prepared by expert chefs."}
                </p>

                <div className="mt-4 text-sm text-gray-500 space-y-1">
                  <p>👨‍🍳 Chef: {meal.chefName || "N/A"}</p>
                  <p>📍 Area: {meal.deliveryArea || "Not specified"}</p>
                  <p>📅 {new Date(meal.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="mt-auto pt-4">
                  <p className="text-lg font-bold text-purple-700 mb-3">
                    ${meal.price}
                  </p>

                  <Link
                    to={`/view-details/${meal._id}`}
                    className="block text-center w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-center gap-2 mt-16 flex-wrap">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`px-4 py-2 rounded-lg border transition ${
              page === num + 1
                ? "bg-purple-600 text-white"
                : "hover:bg-purple-100"
            }`}
          >
            {num + 1}
          </button>
        ))}
      </div>

      {error && (
        <p className="text-center text-red-500 mt-10">Failed to load meals.</p>
      )}
    </section>
  );
};

export default MealsPage;
