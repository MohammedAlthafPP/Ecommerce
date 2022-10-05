import { configureStore } from "@reduxjs/toolkit";
import { cartReducer, deleteCartItemReducer, myCartReducer, saveShippingReducer, shippingDetails } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer,} from "./reducers/productReducers";
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
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword : forgotPasswordReducer,
    cart : cartReducer,
    mycart : myCartReducer,
    deleteCart : deleteCartItemReducer,
    shippingInfo : saveShippingReducer,
    shippingDetails : shippingDetails,
    newOrder : newOrderReducer,
    myOrders : myOrdersReducer,
    orderDetails : orderDetailsReducer,
    newReview : newReviewReducer,
    newProduct : newProductReducer,
    product : productReducer,
    allOrders : allOrdersReducer,
    order : orderReducer,
    
    
  },

  
  
});

export default Store;
