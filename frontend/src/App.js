import React, { useEffect } from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
//import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import "./App.css";
import Loader from "./components/layout/Loader/Loader";
import AdminPages from "./pages/admin/AdminPages";
import HomePage from "./pages/users/HomePage";
import ProductDeatilsPage from "./pages/Product/ProductDetailsPage";
import UserPages from "./pages/users/UserPages";
import All_ProductsPages from "./pages/Product/All_ProductsPages";
import store from "./redux/store";
import { loadUser } from "./redux/actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import CartPage from "./pages/Product/CartPage";



function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}
      
      <Routes>
        <Route path="/user/*" element={<UserPages />} />
        <Route path="/admin/*" element={<AdminPages />} />
        <Route path="/products/*" element={<All_ProductsPages />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/sad" element={<Loader />} />
        <Route path="/product/:id" element={<ProductDeatilsPage />} />
        <Route path="/cart" element={<CartPage />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
