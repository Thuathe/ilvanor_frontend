import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthApi } from "./components/LoginRegister/api/AuthApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { useContext } from "react";
import routes from "./routes";
import NotFound from "./components/NotFound";

import Login from "./components/LoginRegister/pages/Login";
import Register from "./components/LoginRegister/pages/Register";

import PrivateRoute from "./components/LoginRegister/pages/components/PrivateRoute";
import GuestRoute from "./components/LoginRegister/pages/components/GuestRoute";

import AdminPage from "./components/AdminPage/AdminPage";
import Hero from "./components/AdminPage/Homes/Hero";
import UserList from "./components/AdminPage/UserLists/UserList";
import CategoryList from "./components/AdminPage/CategoryLists/CategoryList";
import AdminWebList from "./components/AdminPage/WebList/AdminWebList";
import AdminWebDetail from "./components/AdminPage/WebList/AdminWeblistDetail";
import AdminProfile from "./components/AdminPage/AdminProfiles/AdminProfile";

import UserPage from "./components/UserPage/UserPage";
import UserHome from "./components/UserPage/UserHome";
import WebListDetail from "./components/UserPage/WebList/WebListDetail";
import HomePage from "./components/UserPage/HomePage";
import UserProfile from "./components/UserPage/UserProfiles/UserProfile";
import WebUp from "./components/UserPage/WebUp/WebUp";
import WebUpDetail from "./components/UserPage/WebUp/WebUpDetail";

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
          <Route path={routes.home} element={<HomePage />} />

          {/* 🔒 Halaman Login & Register (hanya untuk yang belum login) */}
          <Route
            path={routes.login}
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path={routes.register}
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />

          {/* 🔐 Halaman Admin */}
          <Route
            path={routes.admin}
            element={
              <PrivateRoute role="admin">
                <AdminPage />
              </PrivateRoute>
            }
          >
            <Route index element={<Hero />} />
            <Route path={routes.adminUsers} element={<UserList />} />
            <Route path={routes.adminCategory} element={<CategoryList />} />
            <Route path={routes.adminWeblist} element={<AdminWebList />} />
            <Route
              path={routes.adminWeblistDetailEdit()}
              element={<AdminWebDetail />}
            />
            <Route path={routes.adminProfile} element={<AdminProfile />} />
          </Route>

          {/* 🔐 Halaman User */}
          <Route
            path={routes.user}
            element={
              <PrivateRoute role="user">
                <UserPage />
              </PrivateRoute>
            }
          >
            <Route index element={<UserHome />} />
            <Route path={routes.userProfile} element={<UserProfile />} />
            <Route path={routes.userWeblist} element={<WebUp />} />
            <Route
              path={routes.userWeblistEditDetail()}
              element={<WebUpDetail />}
            />
            <Route
              path={routes.userWeblistDetailAll()}
              element={<WebListDetail />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/admin/*" element={<NotFound />} />
<Route path="/user/*" element={<NotFound />} />

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
