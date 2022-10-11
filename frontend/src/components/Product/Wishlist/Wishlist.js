import React, { Fragment, useEffect } from "react";
import "./Wishlist.css";
import CartItemCard from "./WishlistCard";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCart,
  clearErrors,
  myCartItems,
} from "../../../redux/actions/cartAction";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  ADD_TO_CART_RESET,
  DELETE_CART_RESET,
} from "../../../constants/cartConstants";
import Loader from "../../layout/Loader/Loader";
import { deleteWishlistItem, getWishlistItems } from "../../../redux/actions/wishlistAction";
import { DELETE_WISHLIST_RESET } from "../../../constants/wishListConstants";

function Wishlist() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { wishlistItems, loading,error:myWishlistError } = useSelector((state) => state.myWishlist);
  const { message:cartMsg,success,error:cartError } = useSelector((state) => state.cart);
  const { message, isDeleted, error } = useSelector(
    (state) => state.deleteWishlist
  );

  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(clearErrors());
    }
    if (cartError) {
      alert.error(cartError.message);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success(message);
      dispatch({ type: DELETE_WISHLIST_RESET });
    }
    if (success) {
        alert.success(cartMsg)
      dispatch({ type: ADD_TO_CART_RESET });
    }

    dispatch(getWishlistItems());
  }, [dispatch, success, error, alert, message, isDeleted,cartMsg]);

  const increaseQuantity = (id, quantity, stock) => {
    if (stock <= quantity) return alert.info("The stock has run out");
    let newQty = quantity + 1;
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    if (1 >= quantity) return;
    let newQty = quantity - 1;
    dispatch(addItemsToCart(id, newQty));
  };

  const checkoutHandler = () => {
    if (!isAuthenticated || isAuthenticated === false) {
      navigate("/login");
    } else {
      if (user.verified.phone === true) {
        navigate("/user/shipping");
      } else {
        navigate("/user/verify/phone");
      }
    }
  };

  const addItemsToCartHandler = (id,stock,quantity=1) => {
    if (isAuthenticated) {
      if (stock <= 0) return alert.info("The stock has run out");
      dispatch(addItemsToCart(id, quantity));
      dispatch(deleteWishlistItem(id));
    } else {
      alert.info("Please Login");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {(wishlistItems && wishlistItems.length === 0) || !wishlistItems ? (
            <div className="emptyCart">
              <RemoveShoppingCartIcon />

              <Typography>No Product in Your Wishlist</Typography>
              <Link to="/products">View Products</Link>
            </div>
          ) : (
            <Fragment>
              <div className="cartPageabcdss">
                <div className="cartHeader">
                  <p>Product</p>
                  <p style={{visibility:'hidden'}}>Quantity</p>
                  <p>Action</p>
                </div>
                {wishlistItems &&
                   wishlistItems.map((item, index) => (
                    <div className="cartContainer" key={index} >
                      <CartItemCard item={item} />
                      <div className="cartInput" style={{visibility:'hidden'}}>
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                      {/* <p className="cartSubtotal">{`₹${item.price *
                    item.quantity}`}</p> */}
                     <div className="detailsBlock-wishlistbtn">
                        <button
                    // disabled={product.stock < 1 ? true : false}
                     onClick={()=>addItemsToCartHandler(item._id,item.stock)}
                  >
                    Add to Cart
                  </button>
                  </div>


                    </div>
                  ))}

                {/* <div className="cartGrossTotal">
                  <div></div>
                  <div className="cartGrossTotalBox">
                    <p>Gross Total</p>
                    <p>
                      {cartItems &&
                        cartItems.length > 0 &&
                        `₹${cartItems.reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )}`}
                    </p>
                  </div>
                  <div></div>
                  <div className="checkOutBtn">
                    <button onClick={checkoutHandler}>Check Out</button>
                  </div>
                </div> */}
                 
              </div>
            </Fragment>
          )}
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

export default Wishlist;
