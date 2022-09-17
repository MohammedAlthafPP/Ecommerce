import axios from "../../axios";
import {ADD_TO_CART} from "../../constants/cartConstants" ;

// Add items to Cart
export const addItemsToCart = (id, quantity) => async (dispatch,getState) => {
    
    const { data } = await axios.get(`product/${id}`);
console.log(data,"=====data");
let CartData = {
    product: data.product._id,
    name: data.product.name,
    price: data.product.price,
    image: data.product.images[0].url,
    stock: data.product.stock,
    quantity,
}

      dispatch({
        type : ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,

        }
      })
console.log(CartData,"=====CartData");
      localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))

  };

  