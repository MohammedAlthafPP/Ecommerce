import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivetRouteUser = () => {

    // const details = JSON.parse(localStorage.getItem("Udetails"));
    // if (details && Object.keys(details).length === 0) {
    // } else {
    //   if (details && details.email) {
    //     navigate(`/user/account`);
     
    // }
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/user/login" replace />;
  }

  return <Outlet />;
};

export default PrivetRouteUser