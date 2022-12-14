import React, { Fragment } from 'react'
import {useDispatch,useSelector} from "react-redux";
import {getOrderDetails,clearErrors} from "../../../redux/actions/orderAction";
import Loader from "../../layout/Loader/Loader";
import {useAlert} from "react-alert"
import MetaData from "../../layout/MetaData"
import "./OrdrDetails.css"
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function OrderDetails() {

    const {order,error,loading} = useSelector((state) => state.orderDetails);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
    if(error){
        alert.error(error.message);
        dispatch(clearErrors());
    }
    if(id.length === 24){
      dispatch(getOrderDetails(id))
    }else {
      navigate("/404")

    }
    
    }, [dispatch,error,alert,id,navigate])
    

  return (
   <Fragment>
    {loading ? (
        <Loader/>
    ) : (
        <Fragment>
        <MetaData title="Order Details" />
        <div className="orderDetailsPage">
          <div className="orderDetailsContainer">
            <Typography component="h1">
              Order #{order && order._id}
            </Typography>
            <Typography>Shipping Info</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p>Name:</p>
                <span>{order && order.user && order.user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>
                  {user && user.phone}
                </span>
              </div>
              <div>
                <p>Address:</p>
                <span>
                  {order && order.shippingInfo &&
                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}
                </span>
              </div>
            </div>
            <Typography>Payment</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                   order && order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order && order.paymentInfo &&
                  order.paymentInfo.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID"}
                </p>
              </div>

              <div>
                <p>Amount:</p>
                <span>???{order && order.totalPrice && order.totalPrice}</span>
              </div>
            </div>

            <Typography>Order Status</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p
                  className={
                    order &&  order.orderStatus && order.orderStatus === "Delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {order && order.orderStatus && order.orderStatus}
                </p>
              </div>
            </div>
          </div>

          <div className="orderDetailsCartItems">
            <Typography>Order Items:</Typography>
            <div className="orderDetailsCartItemsContainer">
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ???{item.price} ={" "}
                      <b>???{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Fragment>

    )}
   </Fragment>
  )
}

export default OrderDetails