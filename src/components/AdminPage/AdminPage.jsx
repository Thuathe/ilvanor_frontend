// src/pages/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbars/Navbar";
import About from "./Footers/About";

const AdminPage = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen p-4">
        <Outlet /> {/* Konten halaman yang dinamis */}
      </main>
      <About />
    </div>
  );
};

export default AdminPage;
