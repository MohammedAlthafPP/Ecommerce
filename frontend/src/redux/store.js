import { configureStore } from "@reduxjs/toolkit";
import { productDetailsReducer,productReducer,} from "./reducers/productReducers";
import { profileReducer, userReducer } from "./reducers/userReducer";

const Store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
  },
});

export default Store;
