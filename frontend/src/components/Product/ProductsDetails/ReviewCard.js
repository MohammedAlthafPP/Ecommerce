import React from "react";
import ProfilerPng from "../../../images/Profile.png.png";
import { Rating } from "@mui/material";
import { useSelector } from "react-redux";

function ReviewCard({ review }) {

  const {user} = useSelector((state) => state.user);
  // const options = {
  //   edit: false,
  //   color: "rgba(20,20,20,0.1)",
  //   activeColor: "tomato",
  //   size: window.innerWidth < 600 ? 20 : 25,
  //   value: review.rating,
  //   isHalf: true,
  // };

  const options = {
    value:review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <img src={user && user.avatar[0].url ? user.avatar[0].url : "/Profile.png"} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardCommentt">{review.comment}</span>
    </div>
  );
}

export default ReviewCard;
