import React, { Fragment } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  
  clearErrors, deleteUser, getAllUsers,
} from "../../../../redux/actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../../../layout/MetaData";
import Sidebar from "../../Dashboard/Sidebar";
//import "./ProductsList.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { DELETE_USER_RESET } from "../../../../constants/userConstants";

function UsersList() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const {loading, error, users} = useSelector((state)=> state.allUsers);
  const { error:deleteError, isDeleted,message} = useSelector((state)=> state.profile);


  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      navigate(`/admin/users`);
      dispatch({type:DELETE_USER_RESET});

      
    }

    dispatch(getAllUsers())
  }, [dispatch,error,alert,deleteError,isDeleted,navigate,message])
  

  const columns = [
    {field : "id", headerName : "User ID", minWidth: 200, flex: 0.8},
    {field : "email", headerName : "Email", minWidth: 350, flex: 1},
    {field : "name", headerName : "Name", minWidth: 150, flex: 0.5,},
    {field : "role", headerName : "Role", minWidth: 270, flex: 0.3,cellClassName:(params) => {
      return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor";
  }},
    {field : "action", headerName : "Action", minWidth: 150, flex: 0.3,type:"number",sortable:false,
    renderCell: (params) => {
      return(
        <Fragment>
          <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
            <EditIcon/>
          </Link>
          <Button onClick={() => deleteUserHandler(params.getValue(params.id,"id"))}>
            <DeleteIcon/>
          </Button>
        </Fragment>
      )
    }
  
  },
  ];

  const rows = [];

  users && users.forEach((item) => {
    rows.push({
      id:item._id,
      role: item.role,
      email:item.email,
      name : item.name,
    })
  })


  return (
    <Fragment>
      <MetaData
        title={`${'All Users -Admin'} -- ${process.env.REACT_APP_SITE_NAME}`}
      />
      <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
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




export default UsersList