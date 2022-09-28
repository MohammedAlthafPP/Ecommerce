import {
  ADD_TO_CART,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  MY_CART_REQUEST,
  MY_CART_SUCCESS,
  MY_CART_FAIL,
  CLEAR_ERRORS,
} from "../../constants/cartConstants";

/* Cart Mongodb Storing start*/
export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_TO_CART_SUCCESS:
      return {
        loading: false,
        cartItems: action.payload,
      };

    case ADD_TO_CART_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Get Cart Items
export const myCartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case MY_CART_REQUEST:
      return {
        loading: true,
      };

    case MY_CART_SUCCESS:
      return {
        loading: false,
        cartItems: action.payload,
      };

    case MY_CART_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
/* Cart Mongodb Storing END*/