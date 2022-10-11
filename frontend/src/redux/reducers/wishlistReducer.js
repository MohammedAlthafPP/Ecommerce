import {
  ADD_TO_WISHLIST_REQUEST,
  ADD_TO_WISHLIST_SUCCESS,
  ADD_TO_WISHLIST_RESET,
  ADD_TO_WISHLIST_FAIL,
  MY_WISHLIST_REQUEST,
  MY_WISHLIST_SUCCESS,
  MY_WISHLIST_FAIL,
  DELETE_WISHLIST_REQUEST,
  DELETE_WISHLIST_SUCCESS,
  DELETE_WISHLIST_RESET,
  DELETE_WISHLIST_FAIL,
  CLEAR_ERRORS,
} from "../../constants/wishListConstants";



/* Wishlist Mongodb Storing start*/
export const newWishlistReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_TO_WISHLIST_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case ADD_TO_WISHLIST_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          message: action.payload.message,
          wishlist: action.payload.wishlist,
        };
        case ADD_TO_WISHLIST_RESET:
        return {
          ...state,
          success:false,
        };
  
      case ADD_TO_WISHLIST_FAIL:
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
export const myWishlistReducer = (state = { wishlistItems: [] }, action) => {
    switch (action.type) {
      case MY_WISHLIST_REQUEST:
        return {
          loading: true,
        };
  
      case MY_WISHLIST_SUCCESS:
        return {
          loading: false,
          wishlistItems: action.payload.wishlistItems,
          success: action.payload.success,
        };
  
      case MY_WISHLIST_FAIL:
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


  // Remove cart item
export const deleteWishlistItemReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_WISHLIST_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case DELETE_WISHLIST_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload.success,
          message: action.payload.message,
        };
      case DELETE_WISHLIST_RESET:
        return {
          ...state,
          isDeleted: false,
          message: false,
        };
  
      case DELETE_WISHLIST_FAIL:
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