import React, { Fragment } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  clearErrors,
  deleteOrder,
} from "../../../../redux/actions/orderAction";

import { useAlert } from "react-alert";
import MetaData from "../../../layout/MetaData";
import Sidebar from "../../Dashboard/Sidebar";
import "./OrdersList.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import {DELETE_ORDER_RESET} from "../../../../constants/orderConstants";
import Loader from "../../../layout/Loader/Loader";

function OrderList() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const { error, orders,loading} = useSelector((state)=> state.allOrders);
  const { error:deleteError, isDeleted} = useSelector((state)=> state.order);


  const deleteOrderHandler = (id) => {
     dispatch(deleteOrder(id));
  }

  useEffect(() => {
    if(error){
      alert.error(error.message);
      dispatch(clearErrors())
    }

    if(deleteError){
      alert.error(deleteError.message);
      dispatch(clearErrors())
    }

    if(isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate(`/admin/orders`);
      dispatch({type:DELETE_ORDER_RESET});

      
    }

    dispatch(getAllOrders())
  }, [dispatch,error,alert,deleteError,isDeleted,navigate])
  

  const columns = [
    {field : "id", headerName : "Order ID", minWidth: 300, flex: 1},
    {field : "status", headerName : "Status" ,minWidth: 150,flex:0.5,
    cellClassName:(params) => {
        return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor";
    }
},
    {field : "itemQty", headerName : "Item Qty" , type : "number",minWidth: 150,flex:0.3},
    {field : "amount", headerName : "Amount" , type : "number",minWidth: 270,flex:0.5},
    {field : "action", headerName : "Action", minWidth: 150, flex: 0.3,type:"number",sortable:false,
    renderCell: (params) => {
      return(
        <Fragment>
          <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
            <EditIcon/>
          </Link>
          <Button onClick={() => deleteOrderHandler(params.getValue(params.id,"id"))}>
            <DeleteIcon/>
          </Button>
        </Fragment>
      )
    }
  
  },
  ];

  const rows = [];

  orders && orders.forEach((item) => {
    rows.push({
      id:item._id,
      status: item.orderStatus,
      itemQty:item.orderItems.length,
      amount : item.totalPrice,
    })
  })


  return (
    <Fragment>
      <MetaData
        title={`${'All Orders - Admin'} -- ${process.env.REACT_APP_SITE_NAME}`}
      />
      <Fragment>
        {loading ? (
          <Loader/>
        ) : (
          <div className="dashboard">
          <Sidebar/>
          <div className="productListContainer">
            <h1 id="productListHeading">ALL ORDERS</h1>
            <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
            />
          </div>
        </div>
        )}
      </Fragment>
    </Fragment>
  )
}

export default OrderList;


