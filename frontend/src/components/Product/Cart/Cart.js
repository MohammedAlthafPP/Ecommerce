import React, { Fragment, useEffect } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart } from "../../../redux/actions/cartAction";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

function Cart() {
  const cartItems = [
    {
      product : "productID",
      price : 400,
      name : "test product 1",
      quanity: 3,
      
      image : "https://rukminim1.flixcart.com/image/416/416/xif0q/computer/y/b/w/-original-imagg6t9sb9gvafu.jpeg?q=70"
    },
    {
      product : "productID",
      price : 400,
      name : "test product 2",
      quanity: 1,
      
      image : "https://rukminim1.flixcart.com/image/416/416/xif0q/computer/y/b/w/-original-imagg6t9sb9gvafu.jpeg?q=70"
    } 
  ]

  const dispatch = useDispatch();

  //const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id,quanity,stock) => {
    const newQty = quanity + 1;
    if(stock <= quanity){
      return;
    }
    let grossTotal = cartItems.reduce((acc,item) => acc + item.quanity * item.price,0)
    dispatch(addItemsToCart(id,newQty,grossTotal))
  }
  
  const decreaseQuantity = (id,quanity) => {
    const newQty = quanity - 1;
    if(1 >= quanity){
      return;
    }
    let grossTotal = cartItems.reduce((acc,item) => acc + item.quanity * item.price,0)
    dispatch(addItemsToCart(id,newQty,grossTotal))
  }
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon/>

          
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
        <div className="cartPage">
          <div className="cartHeader">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>
          {cartItems &&
            cartItems.map((item) => (
              <div className="cartContainer">
                <CartItemCard item={item} />
                <div className="cartInput">
                  <button onClick={()=>decreaseQuantity(item.product,item.quanity)}>-</button>
                  <input type="number" value={item.quanity} readOnly />
                  <button onClick={()=>increaseQuantity(item.product,item.quanity,item.stock)}>+</button>
                </div>
                <p className="cartSubtotal">{`₹${item.price * item.quanity}`}</p>
              </div>
            ))}
  
          <div className="cartGrossTotal">
            <div></div>
            <div className="cartGrossTotalBox">
              <p>Gross Total</p>
              <p>{`₹${cartItems.reduce((acc,item) => acc + item.quanity * item.price,0)}`}</p>
            </div>
            <div></div>
            <div className="checkOutBtn">
              <button>Check Out</button>
            </div>
          </div>
        </div>
      </Fragment>
      )}
    </Fragment>
  );
}

export default Cart;
