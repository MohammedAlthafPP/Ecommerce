import React, { Fragment } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  craeteCategory,
  clearErrors,
} from "../../../../redux/actions/categoryAction";
import { useAlert } from "react-alert";
import MetaData from "../../../layout/MetaData";
import Sidebar from "../../Dashboard/Sidebar";
import "./CategoryList.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from '@mui/icons-material/Launch';
import { useEffect } from "react";
import { DELETE_PRODUCT_RESET } from "../../../../constants/productConstants";
import Loader from "../../../layout/Loader/Loader";

function CategoryList() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const {loading, error, categoryList} = useSelector((state)=> state.allCategories);
  const { error:deleteError, isDeleted} = useSelector((state)=> state.product);


  const deleteProductHandler = (id) => {
   // dispatch(deleteProduct(id));
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
      alert.success("Product Deleted Successfully");
      navigate(`/admin/products`);
      dispatch({type:DELETE_PRODUCT_RESET});

      
    }

    dispatch(getAllCategories())
  }, [dispatch,error,alert,deleteError,isDeleted,navigate])


  const renderCategories = (categories) =>{
    let categoryArray =[];
    
    for(let category of categories){
      categoryArray.push(
        <li key={category.name} >
          {category.name} <span><LaunchIcon/></span>
          {category.children.length > 0 ?  (<ul>{renderCategories(category.children)}</ul>) : null}
        </li>
      )
    }
    return categoryArray
  }
  


  return (
    <Fragment>
      <MetaData
        title={`${'All Categories -Admin'} -- ${process.env.REACT_APP_SITE_NAME}`}
      />
     <Fragment>
      {loading ? (
        <Loader/>
      ) : (
         <div className="dashboard">
         <Sidebar/>
         <div className="categoryListContainer">
           <h1 id="categoryListHeading">ALL CATEGORIES</h1>
           <div>
            <ul>
              {renderCategories(categoryList&&categoryList)}
            </ul>
           </div>
          
         </div>
       </div>
      )}
     </Fragment>
    </Fragment>
  )
}




export default CategoryList