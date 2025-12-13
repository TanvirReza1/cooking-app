import { motion } from "framer-motion";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";

/* ===== MOTION PRESETS ===== */

// 🔥 Premium (smooth + elegant)
const premiumMotion = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: "easeOut",
  },
};

// ⚡ Standard (fast + minimal)
const standardMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.3,
  },
};

const MainLayout = () => {
  // 🔁 Switch motion here
  const motionStyle = premiumMotion; // or standardMotion

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Page Content */}
      <motion.main {...motionStyle} className="flex-1">
        <Outlet />
      </motion.main>

      <Footer />
    </div>
  );
};

export default MainLayout;
