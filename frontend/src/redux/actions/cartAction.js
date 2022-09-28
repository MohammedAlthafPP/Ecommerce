import axios from "../../axios";
import {
  ADD_TO_CART,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  MY_CART_SUCCESS,
  MY_CART_FAIL,
  MY_CART_REQUEST,
  CLEAR_ERRORS,
} from "../../constants/cartConstants";

/* Testing to Db */
export const addItemsToCart = (id, quantity) => async (dispatch) => {
  console.log(id, quantity);

  const { data } = await axios.get(`product/${id}`);
  let cartItems = {
    product: data.product._id,
    price: data.product.price,
    name: data.product.name,
    image: data.product.images[0].url,
    stock: parseInt(data.product.stock),
    quantity 
  };
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`/cart/new`, { cartItems }, config);

    dispatch({ type: ADD_TO_CART_SUCCESS, payload: data.cartItems });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};


// GET cart items 
export const myCartItems = () => async (dispatch) => {
  try {
    dispatch({ type: MY_CART_REQUEST });

    const { data } = await axios.get(`/cart/me`);

    dispatch({ type: MY_CART_SUCCESS, payload: data.cartItems });
    
  } catch (error) {
    dispatch({
      type: MY_CART_FAIL,
      payload: error.response.data,
    });
  }
};




// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};