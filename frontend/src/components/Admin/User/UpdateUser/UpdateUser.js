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

  const {user,error} = useSelector((state)=> state.userDetails);
  const { error:updateError, isUpdated,loading,message} = useSelector((state)=> state.profile);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [role, setRole] = useState("")
    const [emailVerified, setEmailVerified] = useState("")
    const [phoneVerified, setPhoneVerified] = useState("")

  const userId = id;



  useEffect(() => {
    if(error){
      alert.error(error.message);
      dispatch(clearErrors())
    }
    
    if(updateError){
      alert.error(updateError.message);
      dispatch(clearErrors())
    }

    if(isUpdated){
      alert.success(message);
      async function removeUUser() {
        await localStorage.removeItem("UUser");
      }
      removeUUser();
      navigate('/admin/users');
      dispatch({type:UPDATE_USER_RESET});
    }

    dispatch(getUserDetails(userId))
  }, [dispatch,alert,error,isUpdated,navigate,updateError,userId,useParams])



  useEffect(() => {
    if (user) {
      window.localStorage.setItem(
        "UUser",
        JSON.stringify(user && user)
      );
    }
    const UserDetails = JSON.parse(localStorage.getItem("UUser"));

    if (UserDetails && Object.keys(UserDetails).length === 0) {
    } else {
      if (UserDetails && UserDetails._id === userId) {
        setName(UserDetails && UserDetails.name);
        setEmail(UserDetails && UserDetails.email);
        setRole(UserDetails && UserDetails.role); 
        setPhone(UserDetails && UserDetails.phone); 
        setEmailVerified(UserDetails && UserDetails.verified.email); 
        setPhoneVerified(UserDetails && UserDetails.verified.phone); 

      }
    }
  }, [user]);


  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("phone",phone);
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
       readOnly
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
       readOnly
       className={emailVerified&&emailVerified === true ? "greenColor" : "redColor"}
       />
     </div>

     <div>
       <MailOutlineIcon/>
       <input
       type="number"
       placeholder='Phone Number'
       required
       value={phone}
       onChange={(e) => setPhone(e.target.value)}
       readOnly
       className={phoneVerified&&phoneVerified === true ? "greenColor" : "redColor"}
       />
     </div>

     <div>
       <VerifiedUserIcon/>
       <select value={role} onChange={(e)=> setRole(e.target.value)}>
         <option value="" >Choose Role</option>
         <option value="admin" >Admin</option>
         <option value="user" >User</option>
         <option value="seller" >Seller</option>
         

       </select>
     </div>




     <Button
     id='createProductBtn'
     type='submit'
     disabled={loading ? true : false || role === "" ? true : false} >
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