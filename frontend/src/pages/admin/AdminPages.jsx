import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminPrivateRoute from "../../components/Route/AdminPrivateRoute";
import DashBoardPage from "./DashBoardPage";
import ProductListpage from "./ProductListpage.js";
import NewProductPage from "./NewProductPage.js";

function AdminPages() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashBoardPage />} />
      <Route path="/products" element={<ProductListpage />} />
      <Route path="/product" element={<NewProductPage />} />

      {/* <Route path="/dashboard" element={<AdminPrivateRoute isAdmin={true}/>}>
        <Route path="" element={<DashBoardPage />} />
      </Route> */}

    </Routes>
  );
}

export default AdminPages;
