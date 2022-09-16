import { configureStore } from "@reduxjs/toolkit";
import { productDetailsReducer,productReducer,} from "./reducers/productReducers";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";

const Store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword : forgotPasswordReducer,
  },
});

export default Store;
