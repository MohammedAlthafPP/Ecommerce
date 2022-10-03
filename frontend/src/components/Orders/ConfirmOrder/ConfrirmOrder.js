import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutStep from "../../Product/Cart/CheckoutStep";
import MetaData from "../../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { getShippingInfo } from "../../../redux/actions/cartAction";
import "./ConfrirmOrder.css";

function ConfrirmOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems, loading } = useSelector((state) => state.mycart);
  const { shippingInfo } = useSelector((state) => state.shippingDetails);
  console.log(shippingInfo, "===========shippingInfo");
  console.log(user && user.name,"=====user");
  function returnLastElement(shippingInfo) {
    return shippingInfo && shippingInfo.at(-1);
  }

  const value = returnLastElement(shippingInfo);
  console.log(value, "======== VAlue");


  const subtotal = cartItems && cartItems.reduce((acc,item) => acc + item.quantity * item.price,0)
  
  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${value && value.address},${value && value.city},${value && value.state},${value && value.pincode},${value && value.country}`

  console.log(subtotal,shippingCharges,tax,totalPrice);

  useEffect(() => {
    dispatch(getShippingInfo());
  }, [dispatch]);

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice
    }
    sessionStorage.setItem("orderInfo",JSON.stringify(data));
    navigate('/process/payment')
  }



  return (
    <Fragment>
      <MetaData
        title={`${"Confirm Order"} -- ${process.env.REACT_APP_SITE_NAME}`}
      />
      <CheckoutStep activeStep={1} />

      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography> Shipping Info </Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name: </p>
                <span>{user && user.name}</span>
              </div>

              <div>
                <p>Phone: </p>
                <span>{user && user.phone}</span>
              </div>

              <div>
                <p>Address: </p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItem">
            <Typography>Your Cart Items</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product-images" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>

              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>

              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ConfrirmOrder;
