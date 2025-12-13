import React from "react";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />

      <div>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
