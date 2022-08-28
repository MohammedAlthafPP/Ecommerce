import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginSignUp from "../../components/User/LoginSignup/LoginSignUp";
import ProfilePage from "./ProfilePage";
//import ProtectedRoute from "../../components/Route/ProtectedRoute";

import PrivateRoute from "../../components/Route/PrivateRoute";
import UpdateProfilePage from "./UpdateProfilePage";

function UserPages() {
  return (
    <Routes>
      <Route path="/login" element={<LoginSignUp />} />

      <Route path="/account" element={<PrivateRoute />}>
        <Route path="" element={<ProfilePage />} />
      </Route>

      <Route path="/me/update" element={<PrivateRoute />}>
        <Route path="" element={<UpdateProfilePage />} />
      </Route>
      
    </Routes>
  );
}

export default UserPages;
