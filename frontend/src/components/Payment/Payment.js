import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutStep from "../../components/Product/Cart/CheckoutStep";
import MetaData from "../../components/layout/MetaData";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";
import axios from "../../axios"
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "./Payment.css"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useRef } from "react";
import {craeteOrder, clearErrors } from "../../redux/actions/orderAction";

function Payment() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const payBtn = useRef(null);
    const elements = useElements();
    const stripe =useStripe();

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const { user } = useSelector((state) => state.user);
    const { cartItems} = useSelector((state) => state.mycart);
    const { shippingInfo } = useSelector((state) => state.shippingDetails);
    const { error } = useSelector((state) => state.newOrder);
    //const { error } = useSelector((state) => state.newOrder);

    function returnLastElement(shippingInfo) {
        return shippingInfo && shippingInfo.at(-1);
      }
    
      const value = returnLastElement(shippingInfo);
    //   console.log(value && value,"======= Value");
    //   console.log(orderInfo.totalPrice,"======= orderInfo.totalprice");

      const paymentData = {
        amount : Math.round(orderInfo && orderInfo.totalPrice * 100)
      }


      const order = {
        shippingInfo : value && value,
        orderItems : cartItems && cartItems,
        itemPrice : orderInfo&& orderInfo.subtotal,
        taxPrice : orderInfo&& orderInfo.tax,
        shippingPrice : orderInfo&& orderInfo.shippingCharges,
        totalPrice : orderInfo&& orderInfo.totalPrice,



      }

    


    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {

            const config = {
                headers: {
                  "Content-Type": "application/json",
                },
              };
            const {data} = await axios.post(`/payment/process`,paymentData,config);
  
            const client_secret = data.client_secret;

            if(!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret,{
                payment_method: {
                card : elements.getElement(CardNumberElement),
                billing_details : {
                    name : user && user.name,
                    email : user && user.email,
                    address : {
                        line1: value && value.address,
                        city: value && value.city,
                        state: value && value.state,
                        postal_code: value && value.pincode,
                        country: value && value.country,
                    },

                },
            },
            });

            if(result.error){
                payBtn.current.disabled = false;

                alert.error(result.error.message);
            } else {
                if(result.paymentIntent.status === "succeeded"){

                  order.paymentInfo = {
                    id : result.paymentIntent.id,
                    status : result.paymentIntent.status,

                  }
                  dispatch(craeteOrder(order))
                    navigate(`/order/success`);

                } else {
                    alert.error("There's some issue while processing payment");
                }
            }
            
        } catch (error) {
            console.log(error.response,"======== error.response.");
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
            
        }

    }

    useEffect(() => {
      if(error){
        alert.error(error.message);
        dispatch(clearErrors())
      }
    }, [dispatch,error,alert])
    

  return <Fragment>
     <MetaData
        title={`${"Payment"} -- ${process.env.REACT_APP_SITE_NAME}`}
      />
      <CheckoutStep activeStep={2} />

      <div className="paymentContainer">
        <form action="" className="paymentForm" onSubmit={(e) => submitHandler(e)}>
            <Typography>Cart Info</Typography>
            <div>
                <CreditCardIcon/>
                <CardNumberElement className="paymentInput"/>
            </div>

            <div>
                <EventIcon/>
                <CardExpiryElement className="paymentInput" />
            </div>

            <div>
                <VpnKeyIcon/>
                <CardCvcElement className="paymentInput" />
            </div>

            <input type="submit"
            value={`pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
            
            />

        </form>
      </div>
  </Fragment>
}

export default Payment;
