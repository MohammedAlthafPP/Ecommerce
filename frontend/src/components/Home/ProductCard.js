import React, { Fragment, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { addItemsToWishlist,clearErrors } from "../../redux/actions/wishlistAction";
import { ADD_TO_WISHLIST_RESET } from "../../constants/wishListConstants";
import { ADD_TO_CART_RESET } from "../../constants/cartConstants";
import { addItemsToCart } from "../../redux/actions/cartAction";

function ProductCard({ product }) {

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading,error,message,success } = useSelector((state) => state.newWishlist);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { message:cartMsg,success:newCart,error:cartError } = useSelector((state) => state.cart);

  const addToWishlistHandler = (id) => {
    if (isAuthenticated) {
      if (product.stock <= 0) return alert.info("The stock has run out");
      dispatch(addItemsToWishlist(id))

    }else {
      alert.info("Please Login");
    }
  
  };

  const addItemsToCartHandler = (id,quantity=1) => {
    if (isAuthenticated) {
      if (product.stock <= 0) return alert.info("The stock has run out");
      dispatch(addItemsToCart(id, quantity));
    } else {
      alert.info("Please Login");
    }
  };

  // const options = {
  //   edit: false,
  //   color: "rgba(20,20,20,0.1)",
  //   activeColor: "tomato",
  //   size: window.innerWidth < 600 ? 20 : 25,
  //   value: product.ratings,
  //   isHalf: true,
  // };

  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(clearErrors());
    }
    if (cartError) {
      alert.error(cartError.message);
      dispatch(clearErrors());
    }
    if(success) {
      alert.success(message);
      dispatch({type: ADD_TO_WISHLIST_RESET})
    }
    if(newCart) {
      alert.success(cartMsg);
      dispatch({type: ADD_TO_CART_RESET})
    }

  }, [dispatch,error,alert,message,success,newCart])
  


  const options = {
    size: "small",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
   

    
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt="" />
      <p>{product.name}</p>
      <div>
        <Rating {...options} size="14" />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews){" "}
        </span>
      </div>
      <span> &#8377; {product.price}</span>
     
      <div className="cartButton">
        <span
          className="button-content"
          onClick={() => addToWishlistHandler(product._id)}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H24V24H0z" fill="none"></path>
            <path
              d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z"
              fill="currentColor"
            ></path>
          </svg>
        </span>

        <button onClick={() => addItemsToCartHandler(product._id)}>
          <ShoppingCartIcon />
          Add to cart
        </button>
      </div>
      </Link>
   
  );
}

export default ProductCard;
