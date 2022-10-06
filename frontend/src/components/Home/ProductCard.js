import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Rating } from "@mui/material";





function ProductCard({ product }) {

  const addToWishlistHandler= (id) =>{
    console.log(id,"=======id addToWishlistHandler");

  }
 

  // const options = {
  //   edit: false,
  //   color: "rgba(20,20,20,0.1)",
  //   activeColor: "tomato",
  //   size: window.innerWidth < 600 ? 20 : 25,
  //   value: product.ratings,
  //   isHalf: true,
  // };

  const options = {
    size:'small',
    value:product.ratings,
    readOnly: true,
    precision: 0.5,
  };


  return (
    
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt="" />
      <p>{product.name}</p>
      <div>
        <Rating {...options} size="14"/> <span className="productCardSpan"> ({product.numOfReviews} Reviews) </span>
      </div>
      <span>	&#8377; {product.price}</span>

      <div className="cartButton">
     
  <span className="button-content" onClick={()=>addToWishlistHandler(product._id)}>
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H24V24H0z" fill="none"></path><path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z" fill="currentColor"></path></svg> 
  </span>

<button>
  <ShoppingCartIcon/>
  Add to cart
</button>

      </div>
    </Link>
   
  );
}

export default ProductCard;
