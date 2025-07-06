import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthApi } from "../../api/AuthApi";

const GuestRoute = ({ children }) => {
  const { auth } = useContext(AuthApi); // 🔍 Ambil auth dari context

  // ✅ Kalau sudah login, langsung lempar ke dashboard sesuai role
  if (auth.token && auth.user) {
    if (auth.role === 'admin') {
      return <Navigate to="/admin" replace />; // 🔁 Kalau admin, lempar ke admin page
    } else {
      return <Navigate to="/user" replace />; // 🔁 Kalau user, lempar ke user page
    }
  }

  // ✅ Kalau belum login, biarkan tetap di halaman guest
  return children;
};

export default GuestRoute;
