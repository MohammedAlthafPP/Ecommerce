import React from 'react';
import "./OrderSuccess.css"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';


function OrderSuccess() {
  return (
    <div className='orderSuccess'>
        <CheckCircleIcon/>
        <Typography> Your Order has been Placed Successfully</Typography>
        <Link to="/order/orders">View Orders</Link>
    </div>
  )
}

export default OrderSuccess