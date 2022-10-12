import React, { Fragment, useEffect, useState } from "react";
import "./VerifyPhone.css";
import PhonelinkLockIcon from "@mui/icons-material/PhonelinkLock";
import Loader from "../../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  verifyPhone,
  resendPhoneOTP,
} from "../../../redux/actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import MetaData from "../../layout/MetaData";

function VerifyPhoneNumber() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, message, loading, isVerified, isResend } = useSelector(
    (state) => state.verifyUser
  );
  const { user,isAuthenticated } = useSelector((state) => state.user);
  const [otp, setOtp] = useState("");

 
const details = JSON.parse(localStorage.getItem('Udetails'));


if(Object.keys(details).length === 0){
  console.log(details,"===== details");
  console.log("No Details");
}else {
  console.log("details");
}


  const VerifyPhoneSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("otp", otp);

    dispatch(verifyPhone(myForm));
  };

  const resendOtpHandler = (id) => {
     dispatch(resendPhoneOTP(id))
    console.log(id, "======= id");
  };

  useEffect(() => {
    
      
    
   
    if (error) {
      alert.error(error.message);
      dispatch(clearErrors());
    }

    if (isVerified) {
      alert.success(message);
      navigate("/products");
     
    }
    if (isResend) {
      alert.success(message);
      
    }
  
  }, [dispatch, error, alert, message,isResend,isVerified]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="VerifyPhoneContainer">
            <div className="VerifyPhoneBox">
              <h2 className="VerifyPhoneHeading">Verify Phone Number</h2>
              <form
                action=""
                className="VerifyPhoneForm"
                onSubmit={VerifyPhoneSubmit}
              >
                <div className="VerifyPhoneEmail">
                  <PhonelinkLockIcon />

                  <input
                    type="text"
                    placeholder="Enter OTP"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <button onClick={() => resendOtpHandler(user && user._id)}>
                  Resend
                </button>
               

                <input
                  type="submit"
                  value="Verify OTP"
                  className="VerifyPhoneBtn"
                  disabled={otp === "" || loading ? true : false}
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

export default VerifyPhoneNumber;
