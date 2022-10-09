import React from 'react'
import {Link} from 'react-router-dom'
import "./CartItemCard.css"
import { useDispatch } from "react-redux";
import { deleteCartItem } from '../../../redux/actions/cartAction';

function CartItemCard({item}) {
  const dispatch = useDispatch();
  const removeCartitemHandler = (id) =>{
    dispatch(deleteCartItem(id));
   
   
  }
  return (
    <div className="cartItemCard">
        <img src={item.image} alt="Product Preview" />
        <div>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <span>{`Price: ₹${item.price}`}</span>
            <p onClick={()=>removeCartitemHandler(item.product)}>Remove</p>

        </div>
    </div>
  )
}

export default CartItemCard