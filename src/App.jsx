import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthApi } from "./components/LoginRegister/api/AuthApi";

import Login from "./components/LoginRegister/pages/Login";
import Register from "./components/LoginRegister/pages/Register";
import AdminPage from "./components/AdminPage/AdminPage";
import Hero from "./components/AdminPage/Homes/Hero";
import UserList from "./components/AdminPage/UserLists/UserList";
import CategoryList from "./components/AdminPage/CategoryLists/CategoryList";
import WebList from "./components/AdminPage/WebLists/WebList";
import WebDetail from "./components/AdminPage/WebLists/WeblistDetail";
import AdminProfile from "./components/AdminPage/AdminProfiles/AdminProfile";

import UserPage from "./components/UserPage/UserPage";
import HomePage from "./components/UserPage/HomePage";

import PrivateRoute from "./components/LoginRegister/pages/components/PrivateRoute";
import GuestRoute from "./components/LoginRegister/pages/components/GuestRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { useContext } from "react";

function AppContent() {
  const { isInitializing, loading } = useContext(AuthApi);

  // ⏳ Saat aplikasi pertama kali dijalankan, tunggu cek localStorage
  if (isInitializing) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <ClipLoader size={80} color="#6B46C1" />
      </div>
    );
  }

  return (
    <>
      {/* ⏳ Loader global ketika ada request berjalan */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <ClipLoader size={80} color="#6B46C1" />
        </div>
      )}

      <Router>
        <Routes>
          {/* 🏠 Halaman Publik */}
          <Route path="/" element={<HomePage />} />

          {/* 🔒 Halaman Login & Register (hanya untuk yang belum login) */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />

          {/* 🔐 Halaman Admin */}
          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminPage />
              </PrivateRoute>
            }
          >
            <Route index element={<Hero />} />
            <Route path="users" eli7bement={<UserList />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="weblists" element={<WebList />} />
            <Route path="weblists/:id" element={<WebDetail />} />
            <Route path="profils" element={<AdminProfile />} />
          </Route>

          {/* 🔐 Halaman User */}
          <Route
            path="/user"
            element={
              <PrivateRoute role="user">
                <UserPage />
              </PrivateRoute>
            }
          />
        </Routes>

        <ToastContainer />
      </Router>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
