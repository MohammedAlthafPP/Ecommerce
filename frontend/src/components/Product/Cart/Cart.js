import React, { Fragment, useEffect, useState } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, clearErrors, myCartItems } from "../../../redux/actions/cartAction";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";

function Cart() {
  // const cartItems = [
  //   {
  //     product : "productID",
  //     price : 400,
  //     name : "test product 1",
  //     quantity: 3,
      
  //     image : "https://rukminim1.flixcart.com/image/416/416/xif0q/computer/y/b/w/-original-imagg6t9sb9gvafu.jpeg?q=70"
  //   },
  //   {
  //     product : "productID",
  //     price : 400,
  //     name : "test product 2",
  //     quantity: 1,
      
  //     image : "https://rukminim1.flixcart.com/image/416/416/xif0q/computer/y/b/w/-original-imagg6t9sb9gvafu.jpeg?q=70"
  //   } 
  // ]

  const dispatch = useDispatch();
  const alert = useAlert();

const  {cartItems, error ,loading} = useSelector((state) => state.mycart);
console.log(cartItems);
console.log(cartItems && cartItems,"=====cartItems.length === 0 " );

useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(clearErrors());
    }

    dispatch(myCartItems());
  }, [dispatch, error, alert]);




//   function doSomething(qty) {
//      let  globalQty = qty;
//      localStorage.setItem('globalQty', JSON.stringify(globalQty))
//   }

//   const globalQty =parseInt(localStorage.getItem("globalQty")
//   ? JSON.parse(localStorage.getItem("globalQty"))
//   : 1) 
//   console.log(globalQty,"=========globalQty");
//  // const items = JSON.parse(localStorage.getItem('items'));
// // console.log(doSomething(),"===== globalQty");



// const [newQty, setNewQty] = useState(globalQty)
//   const increaseQuantity = (id,quantity,stock) => {

//    // const Qty = globalQty + 1;

//     if (stock <= newQty) return;
//     let qty = newQty + 1;
//     setNewQty(qty)
//    // console.log(newQty,"========= New Qty");
//     dispatch(addItemsToCart(id,newQty))
//     localStorage.setItem('globalQty', JSON.stringify(newQty))
//     dispatch(myCartItems())
          
//   }

//   const decreaseQuantity = (id,quantity) => {
   
//     if (1 >= newQty) return;
//     let qty = newQty - 1;
//     setNewQty(qty)
   
//     dispatch(addItemsToCart(id,newQty))
//     dispatch(myCartItems())
   
//   }
  

const increaseQuantity = (id,quantity,stock) => {

   if (stock <= quantity) return;
   let newQty = quantity + 1;
   dispatch(addItemsToCart(id,newQty))
   dispatch(myCartItems())
 
 }

 const decreaseQuantity = (id,quantity) => {
  
   if (1 >= quantity) return;
   let newQty = quantity - 1;
   
  
   dispatch(addItemsToCart(id,newQty))
   dispatch(myCartItems())

  
 }
 




// console.log(Cart,"========= Cart");
// const [newQty, setNewQty] = useState(globalQty)
//   const increaseQuantity = (id,quantity,stock) => {
//    { cartItems && cartItems.map((item)=> id === item.product ? {...item,quantity:item.quantity + 1} : item)}


          
//   }

//   const decreaseQuantity = (id,quantity) => {
   
//     if (1 >= newQty) return;
//     let qty = newQty - 1;
//     setNewQty(qty)
   
//     dispatch(addItemsToCart(id,newQty))
//     dispatch(myCartItems())
   
//   }


  return (
    <Fragment>
      {cartItems && cartItems.length === 0 || !cartItems ? (
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
                  <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
                  <input type="number" value={item.quantity} readOnly />
                  <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                </div>
                <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
              </div>
            ))}
  
          <div className="cartGrossTotal">
            <div></div>
            <div className="cartGrossTotalBox">
              <p>Gross Total</p>
              <p>{cartItems && cartItems.length > 0 && `₹${ cartItems.reduce((acc,item) => acc + item.quantity * item.price,0)}`}</p>
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


    // <Fragment>
    //     <div className="cartPage">
    //       <div className="cartHeader">
    //         <p>Product</p>
    //         <p>Quantity</p>
    //         <p>Subtotal</p>
    //       </div>
    //       {cartItems &&
    //         cartItems.map((item) => (
    //           <div className="cartContainer">
    //             <CartItemCard item={item} />
    //             <div className="cartInput">
    //               <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>-</button>
    //               <input type="number" value={item.quantity} readOnly />
    //               <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock )} >+</button>
    //             </div>
    //             <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
    //           </div>
    //         ))}
  
    //       <div className="cartGrossTotal">
    //         <div></div>
    //         <div className="cartGrossTotalBox">
    //           <p>Gross Total</p>
    //           <p>{cartItems && cartItems.length > 0 && `₹${ cartItems.reduce((acc,item) => acc + item.quantity * item.price,0)}`}</p>
    //         </div>
    //         <div></div>
    //         <div className="checkOutBtn">
    //           <button>Check Out</button>
    //         </div>
    //       </div>
    //     </div>
    //   </Fragment>
  );
}

export default Cart;
