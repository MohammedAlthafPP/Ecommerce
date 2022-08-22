import React, { Fragment } from "react";
import LoginSignUp from "../../components/User/LoginSignup/LoginSignUp";
import Header from "../../components/layout/Header/Header";

function LoginSingUpPage() {
  return (
    <Fragment>
      <Header />
      <LoginSignUp />
    </Fragment>
  );
}

export default LoginSingUpPage;
