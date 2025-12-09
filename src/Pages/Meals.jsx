import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MealsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);

  // Fetch meals
  useEffect(() => {
    axiosSecure.get("/meals").then((res) => setMeals(res.data));
  }, []);

  // Sort meals by price
  const handleSort = () => {
    const sorted = [...meals].sort((a, b) =>
      sortOrder === "asc" ? b.price - a.price : a.price - b.price
    );
    setMeals(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Handle details click
  const handleViewDetails = (id) => {
    if (!user) {
      return navigate("/login", { state: { from: `/meal/${id}` } });
    }
    navigate(`/meal/${id}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Heading */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
          Today’s Special Meals
        </h2>

        <button
          onClick={handleSort}
          className="px-6 py-2 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition"
        >
          Sort by Price {sortOrder === "asc" ? "⬆" : "⬇"}
        </button>
      </div>

      {/* Meals Grid */}
      <div className="grid md:grid-cols-3 gap-10">
        {meals.map((meal) => (
          <motion.div
            key={meal._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white shadow-xl rounded-2xl overflow-hidden border hover:shadow-2xl transition"
          >
            {/* Food Image */}
            <img
              src={meal.foodImage}
              alt={meal.foodName}
              className="h-60 w-full object-cover"
            />

            <div className="p-5">
              {/* Food Name */}
              <h3 className="text-2xl font-bold">{meal.foodName}</h3>

              {/* Chef Info */}
              <p className="text-gray-600 text-sm mt-1">
                Chef: <span className="font-medium">{meal.chefName}</span>
              </p>
              <p className="text-gray-500 text-sm">Chef ID: {meal.chefId}</p>

              {/* Delivery Area */}
              <p className="text-sm text-gray-600 mt-1">
                Delivery Area: {meal.deliveryArea || "Not Provided"}
              </p>

              {/* Rating */}
              <p className="text-sm mt-2 font-semibold">
                ⭐ Rating: {meal.rating}/5
              </p>

              {/* Price */}
              <p className="text-xl font-bold text-purple-700 mt-3">
                ${meal.price}
              </p>

              {/* View Details Button */}
              <button
                onClick={() => handleViewDetails(meal._id)}
                className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition shadow-md"
              >
                See Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MealsPage;
