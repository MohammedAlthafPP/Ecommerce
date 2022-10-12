import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Loader from "./components/layout/Loader/Loader";
import AdminPages from "./pages/admin/AdminPages";
import HomePage from "./pages/users/HomePage";
import ProductDeatilsPage from "./pages/Product/ProductDetailsPage";
import UserPages from "./pages/users/UserPages";
import AllProductsPages from "./pages/Product/All_ProductsPages";
import AllOrderPages from "./pages/Order/AllOrderPages";
import store from "./redux/store";
import { loadUser } from "./redux/actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import CartPage from "./pages/Product/CartPage";
import { getShippingInfo, myCartItems } from "./redux/actions/cartAction";
import axios from "./axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentPage from "./pages/Order/PaymentPage";
import ErrorPage from "./components/layout/ErrorPage/ErrorPage";
import { toast } from "react-hot-toast";
import WishlistPage from "./pages/Product/WishlistPage";
import { getWishlistItems } from "./redux/actions/wishlistAction";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (user) {
    user && localStorage.setItem("Udetails", JSON.stringify(user));
  }

  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get(`/stripeapikey`);
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    
      store.dispatch(getShippingInfo());
      store.dispatch(loadUser());
      store.dispatch(myCartItems());
      store.dispatch(getWishlistItems());
      getStripeApiKey();

    
   
  }, []);

  // window.addEventListener("contextmenu",(e)=>e.preventDefault());

  const details = JSON.parse(localStorage.getItem("Udetails"));

  if (details && Object.keys(details).length === 0) {
  } else {
    if (details && details.verified.phone === false) {
      toast((t) => (
        <div className="toastCustomAppDiv">
          <span className="toastCustomApp">
            '👏' hi {details && details.name}, Your Phone Number is not Verified
            <a href="/user/verify/phone">
              <button>Verify</button>
            </a>
            <button
              onClick={() => toast.dismiss(t.id)}
              style={{ margin: "0 .5vmax" }}
            >
              Later
            </button>
          </span>
        </div>
      ));
    }
  }

  return (
    <BrowserRouter>
      <Header />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 60000 }}
      />

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path="/user/*" element={<UserPages />} />
        <Route path="/admin/*" element={<AdminPages />} />
        <Route path="/products/*" element={<AllProductsPages />} />
        <Route path="/order/*" element={<AllOrderPages />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/sad" element={<Loader />} />
        <Route path="/product/:id" element={<ProductDeatilsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />

        {/* <Route component={window.location.pathname === '/process/payment' ? null : NotFound} /> */}

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
