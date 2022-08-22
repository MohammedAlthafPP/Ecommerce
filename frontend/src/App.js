import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminPages from "./pages/admin/AdminPages";
import HomePage from "./pages/users/HomePage";
//import LoginSingUpPage from "./pages/users/LoginSingUpPage";
import UserPages from "./pages/users/UserPages";

function App() {
  return (
    <BrowserRouter>          
      <Routes>
        <Route path="/user/*" element={<UserPages/>} />
        <Route path="/admin/*" element={<AdminPages/>} />
        
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/login" element={<LoginSingUpPage />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
