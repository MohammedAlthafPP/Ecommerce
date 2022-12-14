import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginSignUp from "../../components/User/LoginSignup/LoginSignUp";
import ProfilePage from "./ProfilePage";
//import ProtectedRoute from "../../components/Route/ProtectedRoute";

 import PrivateRoute from "../../components/Route/PrivateRoute";
 import PrivateRouteUser from "../../components/Route/PrivetRouteUser";
import UpdateProfilePage from "./UpdateProfilePage";
import UpdatePasswordPage from "./UpdatePasswordPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import ResetPasswordPage from "./ResetPasswordPage";
import CreateShippingPage from "./CreateShippingPage.js";
import VerifyPhoneNumberPage from "./VerifyPhoneNumberPage.js";
import ErrorPage from "../../components/layout/ErrorPage/ErrorPage";

function UserPages() {
  return (
    <Routes>
      <Route path="/login" element={<LoginSignUp />} />

      <Route path="/account" element={<PrivateRoute />}>
        <Route path="" element={<ProfilePage />} />
      </Route>

      <Route path="/me/update" element={<PrivateRoute />}>
        <Route path="" element={<UpdateProfilePage />} />
      </Route>
      
      <Route path="/password/update" element={<PrivateRoute />}>
        <Route path="" element={<UpdatePasswordPage />} />
      </Route>

       {/* <Route path="/verify/phone" element={<PrivateRoute />}>
        <Route path="" element={<VerifyPhoneNumberPage />} />
      </Route> */}

       <Route path="/shipping" element={<PrivateRoute />}>
        <Route path="" element={<CreateShippingPage />} />
      </Route>

      <Route path="/password/forgot" element={<ForgotPasswordPage />} />
       <Route path="/password/reset/:token" element={<ResetPasswordPage />} />

      <Route path="*" element={<ErrorPage/>} />

      <Route path="/verify/phone" element={<VerifyPhoneNumberPage />} />


        {/* <Route path="/verify/phone" element={<PrivateRouteUser />}>
        <Route path="" element={<VerifyPhoneNumberPage />} />
      </Route> */}




      
    </Routes>
  );
}

export default UserPages;
