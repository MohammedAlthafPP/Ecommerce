import { configureStore } from "@reduxjs/toolkit";
import { cartReducer, deleteCartItemReducer, myCartReducer, saveShippingReducer, shippingDetails } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer,} from "./reducers/productReducers";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer, verifyUserReducer } from "./reducers/userReducer";





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
    allUsers : allUsersReducer,
    userDetails : userDetailsReducer,
    productReviews : productReviewsReducer,
    reviews : reviewReducer,
    verifyUser : verifyUserReducer,
    
    
  },

  
  
});

export default Store;
