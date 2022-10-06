import React from "react";
import ProfilerPng from "../../../images/Profile.png";
import { Rating } from "@mui/material";
import { useSelector } from "react-redux";

function ReviewCard({ review }) {
 

  const {user} = useSelector((state) => state.user);

  const options = {
    value:review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <img src={review.avatar ? review.avatar : ProfilerPng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardCommentt">{review.comment}</span>
    </div>
  );
}

export default ReviewCard;
