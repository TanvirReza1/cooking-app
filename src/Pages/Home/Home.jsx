import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import cook from "../../assets/cook.avif";
import Reviews from "./Review";

const Home = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const {
    data: meals = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["home-meals"],
    queryFn: async () => {
      const res = await axios.get(`${backendURL}/meals?page=1&limit=6`);
      return res.data.meals;
    },
  });

  return (
    <div className="pb-24 space-y-32">
      {/* ================= HERO ================= */}
      <section className="min-h-screen md:min-h-[65vh] bg-gradient-to-r from-purple-600 to-pink-500 text-white flex items-center px-6 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Discover Daily{" "}
              <span className="text-yellow-300">Delicious Meals</span>
            </h1>
            <p className="mt-6 text-lg max-w-lg opacity-90">
              Home-style meals cooked fresh by expert chefs and delivered to
              your doorstep.
            </p>

            <Link to="/meals">
              <button className="mt-10 bg-yellow-300 text-purple-900 px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:scale-105 transition">
                Explore Meals
              </button>
            </Link>
          </motion.div>

          <motion.img
            src={cook}
            alt="Hero"
            className="w-full max-h-[420px] object-contain drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm opacity-80"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Scroll ↓
        </motion.div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Meal Categories
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Choose from a wide range of delicious food categories.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            ["Breakfast", "🍳"],
            ["Lunch", "🍛"],
            ["Dinner", "🍽️"],
            ["Vegan", "🥗"],
            ["Desserts", "🍰"],
          ].map(([name, icon]) => (
            <div
              key={name}
              className=" shadow-md hover:shadow-xl rounded-2xl p-6 text-center transition"
            >
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="font-semibold">{name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MEALS ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Today’s Specials
          </h2>
          <p className="mt-4 text-gray-500">Freshly prepared meals for today</p>
        </div>

        {isLoading && <p className="text-center">Loading meals...</p>}
        {error && <p className="text-center text-red-500">Failed to load</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.map((meal) => (
            <motion.div
              key={meal._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className=" rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="h-60 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold">{meal.foodName}</h3>
                <p className="text-sm text-gray-500">Chef: {meal.chefName}</p>
                <p className="mt-3 text-lg font-bold">${meal.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <Reviews />

      {/* ================= FEATURES ================= */}
      <section className=" py-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold">
              Why Choose GhoreyRanna?
            </h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              We deliver more than food — we deliver trust, quality, and
              comfort.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Fresh Ingredients",
                desc: "Only organic and premium quality ingredients for every meal.",
                icon: "🥗",
              },
              {
                title: "Expert Chefs",
                desc: "Meals cooked by experienced home-style chefs you can trust.",
                icon: "👨‍🍳",
              },
              {
                title: "Fast Delivery",
                desc: "Hot, fresh meals delivered quickly to your doorstep.",
                icon: "🚀",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="
            group  p-10 rounded-3xl 
            shadow-md hover:shadow-2xl 
            transition-all duration-300 
            hover:-translate-y-2 text-center
          "
              >
                {/* Icon */}
                <div className="text-5xl mb-6 group-hover:scale-110 transition">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <section className="bg-primary/10 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "12K+", label: "Meals Delivered" },
            { value: "250+", label: "Expert Chefs" },
            { value: "50+", label: "Cities Covered" },
            { value: "98%", label: "Happy Customers" },
          ].map((stat) => (
            <div key={stat.label}>
              <h3 className="text-4xl font-bold text-primary">{stat.value}</h3>
              <p className="mt-2 text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold">How It Works</h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Ordering homemade food is simple, fast, and reliable.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: "🍽️",
              title: "Choose Your Meal",
              desc: "Browse a variety of homemade meals cooked by verified chefs.",
            },
            {
              icon: "👨‍🍳",
              title: "Cooked Fresh",
              desc: "Meals are prepared only after you place an order.",
            },
            {
              icon: "🚚",
              title: "Fast Delivery",
              desc: "Your food is delivered hot and fresh to your doorstep.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className=" p-10 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 text-center relative group"
            >
              {/* Step Number */}
              <span className="absolute top-4 right-6 text-6xl font-extrabold text-primary/10">
                {item.step}
              </span>

              {/* Icon */}
              <div className="text-5xl mb-6">{item.icon}</div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Everything you need to know before ordering your meal.
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              q: "How fast is delivery?",
              a: "Most meals are delivered within 30–45 minutes after confirmation.",
            },
            {
              q: "Is the food hygienic?",
              a: "Yes. All meals are prepared following strict hygiene and safety standards.",
            },
            {
              q: "Can I cancel my order?",
              a: "You can cancel your order anytime before the cooking process starts.",
            },
          ].map((item, index) => (
            <details
              key={index}
              className="group p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold">{item.q}</h3>

                <span className="text-2xl font-bold text-primary group-open:rotate-45 transition">
                  +
                </span>
              </summary>

              <p className="mt-4 text-gray-600 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500  py-24 text-center px-6">
        <h2 className="text-4xl font-extrabold mb-6">
          Ready to Taste Homemade Food?
        </h2>
        <p className="mb-10 text-lg">
          Order now and experience the difference.
        </p>
        <Link to="/meals">
          <button className="bg-yellow-300 text-purple-900 px-12 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition">
            Order Now
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
