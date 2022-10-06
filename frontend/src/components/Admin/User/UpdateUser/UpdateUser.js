import React, { Fragment, useState,useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux";
import {clearErrors, getUserDetails, updateUser} from "../../../../redux/actions/userAction"
import {useAlert} from "react-alert"
import MetaData from "../../../layout/MetaData";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SideBar from "../../Dashboard/Sidebar";
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from "../../../layout/Loader/Loader"
import { UPDATE_USER_RESET } from '../../../../constants/userConstants';
function UpdateUser() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {id} =useParams();

  const {user,loading,error} = useSelector((state)=> state.userDetails);
  console.log( user,"=========== User");
  const { error:updateError, isUpdated,loading:updateLoading} = useSelector((state)=> state.profile);

    const [name, setName] = useState(user&&user.name)
    const [email, setEmail] = useState(user&& user.email)
    const [role, setRole] = useState(user&& user.email)
    // const [name, setName] = useState("")
    // const [email, setEmail] = useState("")
    // const [role, setRole] = useState("")

  const userId = id;


  console.log(user && user._id === userId,"==user && user._id === userId");
  console.log(user && user._id ,"=========", userId);

  useEffect(() => {
    // if(user && user._id !== userId){
    //     dispatch(getUserDetails(userId))
    //     console.log("In the &&&&&&&==================");
    // } else {
    // console.log(" else ########################$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    //     setName(user && user.name);
    //     setEmail(user && user.email);
    //     setRole(user && user.role);  
    // }

  //   if(user && user._id !== userId){
  //     dispatch(getUserDetails(userId))
  //     console.log("In the &&&&&&&==================");
  // } 
  // if(user &&  userId) {
  // console.log(" else ########################$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  //     setName(user.name);
  //     setEmail(user.email);
  //     setRole(user.role);  
     
  // }

 
    if(error){
      alert.error(error.message);
      dispatch(clearErrors())
    }
    
    if(updateError){
      alert.error(updateError.message);
      dispatch(clearErrors())
    }

    if(isUpdated){
      alert.success("User Updated Successfully");
      navigate('/admin/users');
      dispatch({type:UPDATE_USER_RESET});
    }

    dispatch(getUserDetails(userId))
  }, [dispatch,alert,error,isUpdated,navigate,updateError,userId])
 

  console.log(name,email,role,"=========== name,email,role");
  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("role",role);
 
    dispatch(updateUser(userId,myForm))

  };




  return (
//    <Fragment>
//     {loading ? (
//       <Loader/>
//     ) : (
//       <Fragment>
//      <MetaData title={`${'Update User -Admin'} -- ${process.env.REACT_APP_SITE_NAME}`} />
//      <div className="dashboard">
//       <SideBar/>
//       <div className="newProductContainer">
//         <form action="" 
//         className='createproductForm'
//         onSubmit={updateUserSubmitHandler}
//          >

//           <h1>Update User</h1>
//           <div>
//             <PersonIcon/>
//             <input
//             type="text"
//             placeholder='Name'
//             required
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           <div>
//             <MailOutlineIcon/>
//             <input
//             type="email"
//             placeholder='Email'
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>


//           <div>
//             <VerifiedUserIcon/>
//             <select value={role} onChange={(e)=> setRole(e.target.value)}>
//               <option value="" >Choose Role</option>
//               <option value="admin" >Admin</option>
//               <option value="user" >User</option>
              

//             </select>
//           </div>


    

//           <Button
//           id='createProductBtn'
//           type='submit'
//           disabled={updateLoading ? true : false || role === "" ? true : false} >
//             Update

//           </Button>







//         </form>
//       </div>
//      </div>
//    </Fragment>
//     )}
//    </Fragment>

<Fragment>
<MetaData title={`${'Update User -Admin'} -- ${process.env.REACT_APP_SITE_NAME}`} />
<div className="dashboard">
 <SideBar/>
 <div className="newProductContainer">
   {loading ? (
    <Loader/>
   ) : (
    <form action="" 
   className='createproductForm'
   encType='multipart/form-data'
   onSubmit={updateUserSubmitHandler}
    >

     <h1>Update User</h1>
     <div>
       <PersonIcon/>
       <input
       type="text"
       placeholder='Name'
       required
       value={name}
       onChange={(e) => setName(e.target.value)}
       />
     </div>

     <div>
       <MailOutlineIcon/>
       <input
       type="email"
       placeholder='Email'
       required
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       />
     </div>


     <div>
       <VerifiedUserIcon/>
       <select value={role} onChange={(e)=> setRole(e.target.value)}>
         <option value="" >Choose Role</option>
         <option value="admin" >Admin</option>
         <option value="user" >User</option>
         

       </select>
     </div>




     <Button
     id='createProductBtn'
     type='submit'
     disabled={updateLoading ? true : false || role === "" ? true : false} >
       Update

     </Button>







   </form>
   )}
 </div>
</div>
</Fragment>
  )
}




export default UpdateUser