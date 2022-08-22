import React from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./DashBoard";

function AdminPages() {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
    </Routes>
  );
}

export default AdminPages;
