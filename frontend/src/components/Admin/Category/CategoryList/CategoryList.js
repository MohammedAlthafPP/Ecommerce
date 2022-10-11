import React, { Fragment } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  craeteCategory,
  clearErrors,
  deleteCategory,
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
import { DELETE_CATEGORY_RESET } from "../../../../constants/categoryConstants";
import Loader from "../../../layout/Loader/Loader";
import swal from 'sweetalert';

function CategoryList() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const {loading, error, categoryList} = useSelector((state)=> state.allCategories);
  const { error:deleteError, isDeleted,message} = useSelector((state)=> state.category);


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
      alert.success(message);
      dispatch({type:DELETE_CATEGORY_RESET});

      
    }

    dispatch(getAllCategories())
  }, [dispatch,error,alert,deleteError,isDeleted,navigate])


  const renderCategories = (categories) =>{
    let categoryArray =[];
    
    for(let category of categories){
      categoryArray.push(
        <li key={category.name} >
          {category.name} <span onClick={()=> actionHandler(category._id,category.name)}><LaunchIcon/></span>
          {category.children.length > 0 ?  (<ul>{renderCategories(category.children)}</ul>) : null}
        </li>
      )
    }
    return categoryArray
  };



  const actionHandler = (id,name) => {
    swal("What do you want to do?", {
      buttons: {
        Edit: true,
        Delete: true,
        cancel: true,
      },
    })
    .then((value) => {
      switch (value) {
     
        case "Delete":
          swal({
            title: "Are you sure?",
            text: `Once deleted, you will not be able to recover this ${name} Category !`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              dispatch(deleteCategory(id))
            } else {
              
            }
          });

          break;
     
        case "Edit":
         navigate(`/admin/category/${id}`);
          break;
     
        default:
          
      }
    });
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

           {/* <div>
            <ul>
              {renderCategories(categoryList&&categoryList)}
            </ul>
           </div> */}


          
         </div>
       </div>
      )}
     </Fragment>
    </Fragment>
  )
}




export default CategoryList