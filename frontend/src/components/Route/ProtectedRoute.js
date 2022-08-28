import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import {Routes, Route,useNavigate } from 'react-router-dom';

function ProtectedRoute({element : Element, ...rest}) {
    const { isAuthenticated, user,loading } = useSelector((state) => state.user);
    const navigate = useNavigate()
  return (
    <Fragment>
         <Routes>
        {!loading && (
           
            <Route
            {...rest}
            render={(props)=> {
                if(!isAuthenticated) {
                    navigate('/login')
                }


                return < element {...props} />
            }}
            
            />
            
        )}
        </Routes>
    </Fragment>
  )
}

export default ProtectedRoute