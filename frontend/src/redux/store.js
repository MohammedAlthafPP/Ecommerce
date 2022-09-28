import { configureStore } from "@reduxjs/toolkit";
import { cartReducer, myCartReducer } from "./reducers/cartReducer";
import { productDetailsReducer,productReducer,} from "./reducers/productReducers";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";

// let initialState = {
//   cart: {
//     cartItems: localStorage.getItem("cartItems")
//       ? JSON.parse(localStorage.getItem("cartItems"))
//       : [],
//   },
// };
const initialState = {};



const Store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword : forgotPasswordReducer,
    cart : cartReducer,
    mycart : myCartReducer,
    
    
  },

  
  
});

export default Store;
