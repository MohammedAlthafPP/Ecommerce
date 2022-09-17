import React from 'react'
import {Link} from 'react-router-dom'
import "./CartItemCard.css"

function CartItemCard({item}) {
  return (
    <div className="cartItemCard">
        <img src={item.image} alt="Item Image" />
        <div>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <span>{`Price: ₹${item.price}`}</span>
            <p>Remove</p>

        </div>
    </div>
  )
}

export default CartItemCard