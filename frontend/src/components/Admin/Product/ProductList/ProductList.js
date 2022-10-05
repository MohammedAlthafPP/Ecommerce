import React, { Fragment } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProducts,
  clearErrors,
} from "../../../../redux/actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../../../layout/MetaData";
import Sidebar from "../../Dashboard/Sidebar";
import "./ProductsList.css";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";

function ProductList() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {loading, error, products} = useSelector((state)=> state.products);

  useEffect(() => {
    if(error){
      alert.error(error.message);
      dispatch(clearErrors())
    }

    dispatch(getAdminProducts())
  }, [dispatch,error,alert])
  

  const columns = [
    {field : "id", headerName : "Product ID", minWidth: 200, flex: 0.5},
    {field : "name", headerName : "Name", minWidth: 350, flex: 1},
    {field : "stock", headerName : "Stock", minWidth: 150, flex: 0.3,type:"number"},
    {field : "price", headerName : "Price", minWidth: 270, flex: 0.5,type:"number"},
    {field : "action", headerName : "Action", minWidth: 150, flex: 0.3,type:"number",sortable:false,
    renderCell: (params) => {
      return(
        <Fragment>
          <Link to={`/admin/product/${params.getValue(params.id,"id")}`}>
            <EditIcon/>
          </Link>
          <Button>
            <DeleteIcon/>
          </Button>
        </Fragment>
      )
    }
  
  },
  ];

  const rows = [];

  products && products.forEach((item) => {
    rows.push({
      id:item._id,
      stock: item.stock,
      price:item.price,
      name : item.name,
    })
  })


  return (
    <Fragment>
      <MetaData
        title={`${'All Products -Admin'} -- ${process.env.REACT_APP_SITE_NAME}`}
      />
      <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
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
    </Fragment>
  )
}

export default ProductList;
