import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../../components/Route/PrivateRoute";
import ConfirmOrderPage from "./ConfirmOrderPage";
import PaymentPage from "./PaymentPage.js";
import OrderSucessPage from "./OrderSucessPage.js";
import MyOrdersPage from "./MyOrdersPage.js";
import OrderDetailsPage from "./OrderDetailsPage.js";
import ErrorPage from "../../components/layout/ErrorPage/ErrorPage";

function AllOrderPages() {
  return (
    <Routes>
      <Route path="/confirm" element={<ConfirmOrderPage />} />    privetRoute
    
      {/* <Route path="/:keyword" element={<ProductsPage />} /> */}
      {/* <Route path="/confirm" element={<PrivateRoute />}>
        <Route path="" element={<ConfirmOrderPage />} />
      </Route>

      <Route path="/success" element={<PrivateRoute />}>
        <Route path="" element={<OrderSucessPage />} />
      </Route>

      <Route path="/orders" element={<PrivateRoute />}>
        <Route path="" element={<MyOrdersPage />} />
      </Route> */}

<Route path="/success" element={<OrderSucessPage />} /> 
<Route path="/orders" element={<MyOrdersPage />} /> 
<Route path="/:id" element={<OrderDetailsPage />} /> 

<Route path="*" element={<ErrorPage/>} />
     
    </Routes>
  )
}

export default AllOrderPages