import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivetRouteUser = () => {

    const details = JSON.parse(localStorage.getItem("Udetails"));
    if (details && Object.keys(details).length === 0) {
      return <Navigate to="/user/login" replace />;
    } 
      
        
        return <Outlet />;
    
  
  // const { isAuthenticated } = useSelector((state) => state.user);

  // if (!isAuthenticated) {
  //   return <Navigate to="/user/login" replace />;
  // }

  // return <Outlet />;


};

export default PrivetRouteUser