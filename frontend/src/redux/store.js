// import {createStore,combineReducers,applyMiddleware} from "redux"

// import thunk from "redux-thunk";

// import {composeWithDevTools} from "redux-devtools-extension"
// import { productReducer } from "./reducers/productReducers";

// const reducer = combineReducers({
//     products : productReducer

// });

// let initialState={};

// const middleware = [thunk];

// const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

// export default store;

import { configureStore } from '@reduxjs/toolkit'
 import {composeWithDevTools} from "redux-devtools-extension"
 import  productSlice  from "./productSlice";


 const Store = configureStore({
  reducer: {
        productsData: productSlice.reducer,
       
  },
})




export default Store;