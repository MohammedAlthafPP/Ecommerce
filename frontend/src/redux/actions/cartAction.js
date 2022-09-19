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
import Store from "../store";

// Add items to Cart
// export const addItemsToCart = (id, quantity,price) => async (dispatch,getState) => {

//     const { data } = await axios.get(`product/${id}`);
// console.log(id, quantity,price,"=====data");
// // let CartData = {
// //     product: data.product._id,
// //     name: data.product.name,
// //     price: data.product.price,
// //     image: data.product.images[0].url,
// //     stock: data.product.stock,
// //     quantity,
// // }

//       dispatch({
//         type : ADD_TO_CART,
//         payload: {
//             product: data.product._id,
//             name: data.product.name,
//             price: data.product.price,
//             image: data.product.images[0].url,
//             stock: data.product.stock,
//             quantity,

//         }
//       })
// //console.log(CartData,"=====CartData");
//       localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))

//   };

//   export const updateCart = () => {
//     return async dispatch => {
//       let  cart = {
//             cartItems: localStorage.getItem("cartItems")
//               ? JSON.parse(localStorage.getItem("cartItems"))
//               : [],
//           }
//           if(cart) {
//             dispatch({
//                 type : ADD_TO_CART,
//                 payload: cart.cartItems
//             })
//           }

//           console.log(cart,"====== Action");
//     }
//   }

// export const addItemsToCart = (id, quantity,price) => async (dispatch,getState) => {
//     const {cartItems} = Store.getState().cart
//     console.log(cartItems,"=====products");
//     const { data } = await axios.get(`product/${id}`);

//     let product = {
//     product: data.product._id,
//     name: data.product.name,
//     price: data.product.price,
//     image: data.product.images[0].url,
//     stock: data.product.stock,
//     quantity,
// }

//     dispatch({
//         type : ADD_TO_CART,
//         payload : {cartItems : {
//             [id] : {
//                 product: data.product._id,
//     name: data.product.name,
//     price: data.product.price,
//     image: data.product.images[0].url,
//     stock: data.product.stock,
//     quantity,
//             }
//         }}
//     })

// }

/* LOCAL STORAGE CART START */
// export const addItemsToCart = (cartData) => async (dispatch) => {
//   console.log(cartData);
//  const  {id,quanity} = cartData
//   const { data } = await axios.get(`product/${id}`);

//   let product = {
//     product: data.product._id,
//     name: data.product.name,
//     price: parseInt(data.product.price),
//     image: data.product.images[0].url,
//     stock: parseInt(data.product.stock),
//     quanity,

//   };

//   // if cart already exists in LS ,then use it ,otherwise set to empty array
//   const cartItems = localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [];

//   // check if dublicates
//   const dublicates = cartItems.filter((cartItem) => cartItem.product === id);
//   console.log(dublicates, "====dublicates");
//   // if No dublicates
//   if (dublicates.length === 0) {
//     const productToAdd = {
//       ...product,
//       cart: 1,
//     };

//     // ad product data to cart
//     cartItems.push(productToAdd);

//     // add cart to local storage
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));

//     // add cart to redux
//     dispatch({
//       type: ADD_TO_CART,
//       payload: cartItems,
//     });
//   }
// };

// export const updateCart = () => {
//   return async (dispatch) => {
//     let cart = {
//       cartItems: localStorage.getItem("cartItems")
//         ? JSON.parse(localStorage.getItem("cartItems"))
//         : [],
//     };
//     if (cart) {
//       dispatch({
//         type: ADD_TO_CART,
//         payload: cart.cartItems,
//       });
//     }
//   };
// };
/* LOCAL STORAGE CART END */

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