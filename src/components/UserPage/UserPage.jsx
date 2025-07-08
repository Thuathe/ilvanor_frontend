import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbars/Navbar";
import About from "./Footers/About";

const UserPage = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* Semua konten halaman user akan muncul di sini */}
      <About />
    </div>
  );
};

export default UserPage;
