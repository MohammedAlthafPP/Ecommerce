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
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { DELETE_USER_RESET } from "../../../../constants/userConstants";
import Loader from "../../../layout/Loader/Loader";
import swal from 'sweetalert';

function UsersList() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate()
  const {loading, error, users} = useSelector((state)=> state.allUsers);
  const { error:deleteError, isDeleted,message} = useSelector((state)=> state.profile);




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
  
  const userEditHandler = (id) => {
    navigate(`/admin/user/${id}`)

  }

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
          {/* <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
            <EditIcon/>
          </Link> */}
          <Button onClick={() => userEditHandler(params.getValue(params.id,"id"))}>
            <EditIcon />
          </Button>
          {/* <Button onClick={() => deleteUserHandler(params.getValue(params.id,"id"))}> */}
          <Button onClick={() => handleShow(params.getValue(params.id,"id"),params.getValue(params.id,"name"))}>
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



const handleShow = (id,name) =>{
  swal({
    title: "Are you sure?",
    text: `Once deleted, you will not be able to recover this ${name}'s details!`,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      dispatch(deleteUser(id));
      swal(`Poof! User ${name} file has been deleted!`, {
        icon: "success",
      });
      console.log(id,"======id");
    } else {
      swal(`User ${name} is safe!  `);
    }
  });
}


  return (
    <Fragment>
      <MetaData
        title={`${'All Users -Admin'} -- ${process.env.REACT_APP_SITE_NAME}`}
      />
     <Fragment>
      {loading ? (
        <Loader/>
      ) : (
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
      )}
     </Fragment>
   


    </Fragment>
  )
}




export default UsersList