import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./ProductsPage";


function All_ProductsPages() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/:keyword" element={<ProductsPage />} />
     
    </Routes>
  );
}

export default All_ProductsPages;
