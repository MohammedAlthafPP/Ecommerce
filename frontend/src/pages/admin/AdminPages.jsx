import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminPrivateRoute from "../../components/Route/AdminPrivateRoute";
import DashBoardPage from "./DashBoardPage";
import ProductListpage from "./ProductListpage";
import NewProductPage from "./NewProductPage";
import UpdateProductPage from "./UpdateProductPage";
import OrdersListPage from "./OrdersListPage";
import ProcessOrderPage from "./ProcessOrderPage";
import UsersListPage from "./UsersListPage";
import UpdateUserPage from "./UpdateUserPage";
import ProductReviewsPage from "./ProductReviewsPage";
import CategoryListPage from "./CategoryListPage.js";
import NewCategoryPage from "./NewCategoryPage.js";


import ErrorPage from "../../components/layout/ErrorPage/ErrorPage";


function AdminPages() {
  return (
    <Routes>
      {/* <Route path="/dashboard" element={<DashBoardPage />} /> */}
      <Route path="/products" element={<ProductListpage />} />
      <Route path="/product" element={<NewProductPage />} />
      <Route path="/product/:id" element={<UpdateProductPage />} />
      <Route path="/orders" element={<OrdersListPage />} />
      <Route path="/order/:id" element={<ProcessOrderPage />} />
      <Route path="/users" element={<UsersListPage />} />
      <Route path="/user/:id" element={<UpdateUserPage />} />
      <Route path="/reviews" element={<ProductReviewsPage />} />
      <Route path="/categories" element={<CategoryListPage />} />
      <Route path="/category" element={<NewCategoryPage />} />



      <Route path="*" element={<ErrorPage/>} />
      <Route path="/dashboard" element={<AdminPrivateRoute isAdmin={true}/>}>
        <Route path="" element={<DashBoardPage />} />
      </Route>

    </Routes>
  );
}

export default AdminPages;
