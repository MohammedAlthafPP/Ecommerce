import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const details = JSON.parse(localStorage.getItem("Udetails"));
  if (!isAuthenticated ) {
    return <Navigate to="/user/login" replace />;
  }

  return <Outlet />;
};







export default PrivateRoute;



