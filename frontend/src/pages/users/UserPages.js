import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginSignUp from "../../components/User/LoginSignup/LoginSignUp";

function UserPages() {
  return (
    <Routes>
      <Route path="/login" element={<LoginSignUp />} />
    </Routes>
  );
}

export default UserPages;
