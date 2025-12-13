import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import cook from "../../assets/cook.avif";

import Reviews from "./Review";

const Home = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // 🔹 Fetch meals (first 6)
  const {
    data: meals = [],
    isLoading: mealsLoading,
    error: mealsError,
  } = useQuery({
    queryKey: ["home-meals"],
    queryFn: async () => {
      const res = await axios.get(`${backendURL}/meals?page=1&limit=6`);
      return res.data.meals; // ✅ IMPORTANT
    },
  });

  {
    mealsLoading && <p className="text-center py-10">Loading meals...</p>;
  }

  {
    mealsError && (
      <p className="text-center text-red-500 py-10">Failed to load meals</p>
    );
  }

  return (
    <div className="space-y-24 pb-24">
      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Discover Daily{" "}
              <span className="text-yellow-300">Delicious Meals</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl w-11/12">
              Freshly cooked meals by expert chefs. Choose from a variety of
              flavors every day.
            </p>

            <Link to="/meals">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="mt-8 bg-yellow-300 text-purple-900 font-bold px-8 py-3 rounded-full shadow-lg"
              >
                Explore Meals
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            className="flex-1"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <img src={cook} className="w-full drop-shadow-2xl" alt="Hero" />
          </motion.div>
        </div>
      </section>

      {/* ================= DAILY MEALS ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="w-full max-w-md mx-auto drop-shadow-2xl md:max-w-lg text-4xl font-bold tracking-wide mb-10 text-center">
          Today’s Special Meals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {meals.map((meal) => (
            <motion.div
              key={meal._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white shadow-lg sm:shadow-xl rounded-2xl overflow-hidden border
           mx-auto w-full max-w-sm sm:max-w-none"
            >
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="h-60 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold">{meal.foodName}</h3>
                <p className="text-gray-600 text-sm">Chef: {meal.chefName}</p>
                <p className="text-lg font-bold mt-2">${meal.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CUSTOMER REVIEWS ================= */}
      <Reviews></Reviews>

      {/* ================= EXTRA SECTION ================= */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white p-8 rounded-2xl shadow-xl text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Fresh Ingredients</h3>
            <p className="text-gray-600">
              We use premium organic ingredients in all meals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="bg-white p-8 rounded-2xl shadow-xl text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Expert Chefs</h3>
            <p className="text-gray-600">
              Our chefs bring years of global culinary experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="bg-white p-8 rounded-2xl shadow-xl text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Fast Delivery</h3>
            <p className="text-gray-600">
              Your meal reaches your door fresh and fast.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
