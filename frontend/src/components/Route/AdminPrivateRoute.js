import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = (Admin) => {
  const { isAdmin } = Admin;

  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (isAuthenticated === false) {
    return <Navigate to="/user/login" replace />;
  }
  if (isAdmin === true && user.role === "admin") {
    return <Outlet />;
  }
};

export default AdminPrivateRoute;
