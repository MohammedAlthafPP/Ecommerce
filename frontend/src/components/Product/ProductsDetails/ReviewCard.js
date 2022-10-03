import React from "react";
import ProfilerPng from "../../../images/Profile.png.png";
import { Rating } from "@mui/material";

function ReviewCard({ review }) {
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
      <img src={ProfilerPng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardCommentt">{review.comment}</span>
    </div>
  );
}

export default ReviewCard;
