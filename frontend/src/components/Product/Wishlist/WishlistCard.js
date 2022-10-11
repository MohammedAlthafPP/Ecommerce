import React from 'react'
import {Link} from 'react-router-dom'
//import "./CartItemCard.css"
import { useDispatch } from "react-redux";
import { deleteWishlistItem } from '../../../redux/actions/wishlistAction';

function WishlistCard({item}) {
  const dispatch = useDispatch();
  
  const removeCartitemHandler = (id) =>{
    dispatch(deleteWishlistItem(id));
   
   
  }
  return (
    <div className="cartItemCard">
        <img src={item.images[0].url} alt="Product Preview" />
        <div>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <span>{`Price: ₹${item.price}`}</span>
            <p onClick={()=>removeCartitemHandler(item._id)}>Remove</p>

        </div>
    </div>
  )
}



export default WishlistCard