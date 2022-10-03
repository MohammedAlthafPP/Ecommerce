import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader/Loader";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      //return <Navigate to="/user/login"/>
      navigate("/user/login");
    }
  }, [isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My profile</h1>
              <img src={user.avatar[0].url} alt={user.name} />
              <Link to="/user/me/update"> Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.joinedOn).substr(0, 10)}</p>
              </div>
              <div>
                <Link to="/order/orders">My Orders</Link>
                <Link to="/user/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Profile;
