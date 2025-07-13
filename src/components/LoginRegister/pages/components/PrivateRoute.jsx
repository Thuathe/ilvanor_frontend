import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthApi } from "../../api/AuthApi";
import routes from "../../../../routes";
const PrivateRoute = ({ children, role }) => {
  const { auth } = useContext(AuthApi); // 🔍 Ambil state auth gabungan

  // ✅ Kalau belum login, redirect ke halaman login sesuai role
  if (!auth.token || !auth.user) {
    const redirectPath = role === "admin" ? "/admin/login" : routes.login;
    return <Navigate to={redirectPath} replace />;
  }

  // ✅ Kalau role user salah, redirect ke halaman sesuai role yang benar
  if (auth.role !== role) {
    const correctPath = auth.role === "admin" ? routes.admin : routes.user;
    return <Navigate to={correctPath} replace />;
  }

  // ✅ Kalau semua sesuai, tampilkan halaman
  return children;
};

export default PrivateRoute;
