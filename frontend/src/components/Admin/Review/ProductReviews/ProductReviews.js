import React, { Fragment, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReviews,
  deleteReviews,
  clearErrors,
} from "../../../../redux/actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../../../layout/MetaData";
import Sidebar from "../../Dashboard/Sidebar";
import "./ProductReviews.css";
import {  useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import StarsIcon from '@mui/icons-material/Stars';
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { DELETE_REVIEW_RESET } from "../../../../constants/productConstants";


function ProductReviews() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const {error:deleteError, isDeleted} = useSelector((state)=> state.reviews);
  const { error, reviews,loading} = useSelector((state)=> state.productReviews);

  const [productId, setProductId] = useState("")

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId,productId));
  }

  const productsReviewsSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(getAllReviews(productId))
  }

  useEffect(() => {

    if(productId.length === 24){
      dispatch(getAllReviews(productId))
    }



    if(error){
      alert.error(error.message);
      dispatch(clearErrors())
    }
    if(deleteError){
      alert.error(deleteError.message);
      dispatch(clearErrors())
    }

    if(isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate(`/admin/reviews`);
      dispatch({type:DELETE_REVIEW_RESET});

      
    }

    
  }, [dispatch,error,alert,deleteError,isDeleted,navigate,productId])
  

  const columns = [
    {field : "id", headerName : "Review ID", minWidth: 200, flex: 0.5},
    {field : "user", headerName : "User", minWidth: 200, flex: 0.6},
    {field : "comment", headerName : "Comments", minWidth: 350, flex: 1},
    {field : "rating", headerName : "Rating", minWidth: 180, flex: 0.4,type:"number",cellClassName:(params) => {
      return params.getValue(params.id, "rating") >= 3  ? "#greenColorClass" : "#redColorClass";
  }},
    {field : "action", headerName : "Action", minWidth: 150, flex: 0.3,type:"number",sortable:false,
    renderCell: (params) => {
      return(
        <Fragment>
          <Button onClick={() => deleteReviewHandler(params.getValue(params.id,"id"))}>
            <DeleteIcon/>
          </Button>
        </Fragment>
      )
    }
  
  },
  ];

  const rows = [];

  reviews && reviews.forEach((item) => {
    rows.push({
      id:item._id,
      rating: item.rating,
      comment:item.comment,
      user : item.name,
    })
  })


  return (
    <Fragment>
      <MetaData
        title={`${'All Reviews -Admin'} -- ${process.env.REACT_APP_SITE_NAME}`}
      />
      <div className="dashboard">
        <Sidebar/>
        <div className="productReviewContainer">

        <form action="" 
   className='productReviewForm'
   encType='multipart/form-data'
   onSubmit={productsReviewsSubmitHandler}
    >

     <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
     <div>
       <StarsIcon/>
       <input
       type="text"
       placeholder='Product Id'
       required
       value={productId}
       onChange={(e) => setProductId(e.target.value)}
       />
     </div>

    

     <Button
     id='createProductBtn'
     type='submit'
     disabled={loading ? true : false || productId === "" ? true : false} >
       Search

     </Button>







   </form>

{reviews && reviews.length > 0 ? (
  
  <DataGrid 
  rows={rows}
  columns={columns}
  pageSize={10}
  disableSelectionOnClick
  className="productListTable"
  autoHeight
  />
) : (
  <h1 className="productReviewsFormHeading">
    No Reviews Found
  </h1>
)}
        </div>
      </div>
    </Fragment>
  )
}



export default ProductReviews