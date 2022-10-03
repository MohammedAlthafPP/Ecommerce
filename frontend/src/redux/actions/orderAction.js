import axios from "../../axios";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../../constants/orderConstants";

  // CREATE order
  export const craeteOrder = (order) =>async (dispatch) => {
    try {
        dispatch({type : CREATE_ORDER_REQUEST });

        const config = {
            headers : {
                "Content-Type" : "application/json",
            },
        };

        const {data} = await axios.post(`/order/new`,order,config);

        dispatch({
            type : CREATE_ORDER_SUCCESS,
            payload : data,
        });
        
    } catch (error) {
        dispatch({
            type : CREATE_ORDER_FAIL,
            payload : error.response.data,
        })
        
    }

  };



 // My-Orders
 export const myOrders = (order) =>async (dispatch) => {
    try {
        dispatch({type : MY_ORDERS_REQUEST});


        const {data} = await axios.get(`/orders/me`);


        dispatch({
            type : MY_ORDERS_SUCCESS,
            payload : data.orders,
        });
        
    } catch (error) {
        dispatch({
            type : MY_ORDERS_FAIL,
            payload : error.response.data,
        })
        
    }

  };


  // Single Order Deatiils
 export const getOrderDetails = (id) =>async (dispatch) => {
    try {
        dispatch({type : ORDER_DETAILS_REQUEST});


        const {data} = await axios.get(`/order/${id}`);
      

        dispatch({
            type : ORDER_DETAILS_SUCCESS,
            payload : data.order,
        });
        
    } catch (error) {
        dispatch({
            type : ORDER_DETAILS_FAIL,
            payload : error.response.data,
        })
        
    }

  };















  // Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };