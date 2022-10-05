import {
  ADD_TO_CART,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  MY_CART_REQUEST,
  MY_CART_SUCCESS,
  MY_CART_FAIL,
  DELETE_CART_REQUEST,
  DELETE_CART_SUCCESS,
  DELETE_CART_FAIL,
  ADD_SHIPPING_REQUEST,
  ADD_SHIPPING_SUCCESS,
  ADD_SHIPPING_FAIL,
  GET_SHIPPING_REQUEST,
  GET_SHIPPING_SUCCESS,
  GET_SHIPPING_FAIL,
  CLEAR_ERRORS,
  DELETE_CART_RESET,
  ADD_TO_CART_RESET,
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
        success: action.payload.success,
        cartItems: action.payload.cartItems,
      };
      case ADD_TO_CART_RESET:
      return {
        ...state,
        success:false,
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

// Remove cart item
export const deleteCartItemReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };
    case DELETE_CART_RESET:
      return {
        ...state,
        isDeleted: false,
        message: false,
      };

    case DELETE_CART_FAIL:
      return {
        ...state,
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

// Save Shipping Details
export const saveShippingReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SHIPPING_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_SHIPPING_SUCCESS:
      return {
        loading: false,
        shippingInfo: action.payload,
      };

    case ADD_SHIPPING_FAIL:
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

// Get Shipping Info
export const shippingDetails = (state = { shippingInfo: [] }, action) => {
  switch (action.type) {
    case GET_SHIPPING_REQUEST:
      return {
        loading: true,
      };

    case GET_SHIPPING_SUCCESS:
      return {
        loading: false,
        shippingInfo: action.payload,
      };

    case GET_SHIPPING_FAIL:
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