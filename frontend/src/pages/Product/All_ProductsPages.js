import React from "react";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "../../components/layout/ErrorPage/ErrorPage";
import ProductsPage from "./ProductsPage";


function All_ProductsPages() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/:keyword" element={<ProductsPage />} />
      <Route path="*" element={<ErrorPage/>} />
     
    </Routes>
  );
}

export default All_ProductsPages;
