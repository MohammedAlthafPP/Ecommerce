import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import "./App.css";
import Loader from "./components/layout/Loader/Loader";
import AdminPages from "./pages/admin/AdminPages";
import HomePage from "./pages/users/HomePage";
import ProductDeatilsPage from "./pages/Product/ProductDetailsPage";
import UserPages from "./pages/users/UserPages";
import All_ProductsPages from "./pages/Product/All_ProductsPages";
import AllOrderPages from "./pages/Order/AllOrderPages";
import store from "./redux/store";
import { loadUser } from "./redux/actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import CartPage from "./pages/Product/CartPage";
import { getShippingInfo, myCartItems, updateCart } from "./redux/actions/cartAction";
import axios from "./axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentPage from "./pages/Order/PaymentPage";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get(`/stripeapikey`);
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    store.dispatch(myCartItems());
    getStripeApiKey();
  }, []);
  useEffect(() => {
    store.dispatch(getShippingInfo());
  }, []);

  return (
    <BrowserRouter>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path="/user/*" element={<UserPages />} />
        <Route path="/admin/*" element={<AdminPages />} />
        <Route path="/products/*" element={<All_ProductsPages />} />
        <Route path="/order/*" element={<AllOrderPages />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/sad" element={<Loader />} />
        <Route path="/product/:id" element={<ProductDeatilsPage />} />
        <Route path="/cart" element={<CartPage />} />

        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <PaymentPage />
              </Elements>
            }
          />
        )}
        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
