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

// export const cartReducer = (state = { cartItems: [] }, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       const item = action.payload;

//       const isItemExist = state.cartItems.find(
//         (i) => i.product === item.product
//       );

//       if (isItemExist) {
//         return {
//           ...state,
//           cartItems: state.cartItems.map((i) =>
//             i.product === isItemExist.product ? item : i
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           cartItems: [...state.cartItems, item],
//         };
//       }

//     default:
//       return state;
//   }
// };

// const initState = {
//   cartItems : []
//     // name : {
//     //   _id: "sddff",
//     //   name: "sddff",
//     //   imge: "sddff"
//     // }

// }

// export const cartReducer = (state = initState, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       state = {
//         ...state,
//         cartItems : action.payload.cartItems
//       }
//       break;

//   }
//   return state;
// }

/* Cart LOCal storage Start */

// let INITIAL_STATE = {
//   cartItems : []
// }

// if(localStorage.getItem('cart')) {
//   INITIAL_STATE.cartItems =JSON.parse(localStorage.getItem('cart'));
// }else {
//   INITIAL_STATE.cartItems = [];
// }

// export const cartReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       return {
//         cartItems: [...action.payload]
//       }
//     default:
//      return state
//   }

// }

/* Cart LOCAl storage END */

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
