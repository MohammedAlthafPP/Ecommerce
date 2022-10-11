import axios from "../../axios";
import {
    ADD_TO_WISHLIST_REQUEST,
    ADD_TO_WISHLIST_SUCCESS,
    ADD_TO_WISHLIST_FAIL,
    MY_WISHLIST_REQUEST,
    MY_WISHLIST_SUCCESS,
    MY_WISHLIST_FAIL,
    DELETE_WISHLIST_REQUEST,
    DELETE_WISHLIST_SUCCESS,
    DELETE_WISHLIST_FAIL,
    CLEAR_ERRORS
  } from "../../constants/wishListConstants";
  

  /* Testing to Db */
export const addItemsToWishlist = (id) => async (dispatch) => {
    try {
      dispatch({ type: ADD_TO_WISHLIST_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(`/wishlist/${id}`, config);
  
      dispatch({ type: ADD_TO_WISHLIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_TO_WISHLIST_FAIL,
        payload: error.response.data,
      });
    }
  };

// GET Wishlist items 
export const getWishlistItems = () => async (dispatch) => {
    try {
      dispatch({ type: MY_WISHLIST_REQUEST });
  
      const { data } = await axios.get(`/wishlist/me`);
  
      dispatch({ type: MY_WISHLIST_SUCCESS, payload: data });
      
    } catch (error) {
      dispatch({
        type: MY_WISHLIST_FAIL,
        payload: error.response.data,
      });
    }
  };


  // Delete Order
export const deleteWishlistItem = (id) => async (dispatch) => {
    console.log(id,"=== action remove cart");
    try {
      dispatch({ type:   DELETE_WISHLIST_REQUEST, });
  
      const { data } = await axios.delete(`/wishlist/${id}`);
  
      dispatch({ type: DELETE_WISHLIST_SUCCESS,
         payload: data,
       
       
      
      });
    } catch (error) {
      dispatch({
        type: DELETE_WISHLIST_FAIL,
        payload: error.response.data,
      });
    }
  };
  

  // Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };