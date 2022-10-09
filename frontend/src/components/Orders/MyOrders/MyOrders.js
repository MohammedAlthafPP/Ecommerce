import React, { Fragment } from 'react'
import {useDispatch,useSelector} from "react-redux";
import {myOrders,clearErrors} from "../../../redux/actions/orderAction"
import { DataGrid} from '@mui/x-data-grid';
import LaunchIcon from '@mui/icons-material/Launch';
import Loader from "../../layout/Loader/Loader";
import {useAlert} from "react-alert"
import MetaData from "../../layout/MetaData"
import "./myOrders.css"
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


function MyOrders() {

    const dispatch = useDispatch();
    const alert  = useAlert();
    const {loading, error, orders} = useSelector((state)=> state.myOrders);

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if(error) {
          alert.error(error.message);
          dispatch(clearErrors());
        }
        dispatch(myOrders())
      }, [dispatch,alert,error])

    const columns = [
        {field : "id", headerName : "Order ID", minWidth: 300, flex: 1},
        {field : "status", headerName : "Status" ,minWidth: 150,flex:0.5,cellClassName:
        (params) => {
            return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor";
        }
    },
        {field : "itemQty", headerName : "Item Qty" , type : "number",minWidth: 150,flex:0.3},
        {field : "amount", headerName : "Amount" , type : "number",minWidth: 270,flex:0.5},
        {field : "actions", headerName : "Actions" ,type : "number",minWidth: 270,flex:0.3,sortable:false,
        renderCell : (params)=> {
            return (
                <Link to={`/order/${params.getValue(params.id,"id")}`}>
                    <LaunchIcon/>
                </Link>
            )
        }
    },

    ];
    const rows = []

        orders && orders.forEach((item,index) => {
            rows.push({
                itemQty : item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount : item.totalPrice,
            })
        })
    

 
    

  return (
    <Fragment >
       <MetaData
        title={`${user && user.name}'s - Orders -- ${process.env.REACT_APP_SITE_NAME}`}
      />
      {loading ? (
        <Loader/>
      ) : (
        <div className='myOrdersPage'>
            <DataGrid 
            rows={rows} 
            columns={columns} 
            pageSize={10}
            disableSelectionOnClick
            className='myordersTable'
            autoHeight
            />
            <Typography id="myOrdersHeading" >{user && user.name}'s Orders</Typography>

        </div>
      )}
    </Fragment>
  )
}

export default MyOrders