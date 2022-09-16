import React, { Fragment, useEffect, useState } from "react";
import "./ForgotPassword.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Loader from "../../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../../redux/actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";

function ForgotPassword() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector((state) => state.forgotPassword);

  const [email, setEmail] = useState("");
  
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
     myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {

    if (error) {
      alert.error(error.message);
      dispatch(clearErrors());
    }

    if (message !== undefined) {
      alert.success(message);
    }
  }, [dispatch, error, alert,message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                action=""
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
                {/* //disabled = {loading ? true : false} */}
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ForgotPassword;
