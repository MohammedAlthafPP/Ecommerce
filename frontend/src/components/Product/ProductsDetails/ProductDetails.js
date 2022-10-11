import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../../redux/actions/productAction";
import { useNavigate, useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import Loader from "../../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../../layout/MetaData";
import { addItemsToCart, myCartItems } from "../../../redux/actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../../constants/productConstants";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.cart);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const {success,error:reviewError} = useSelector((state) => state.newReview)

  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError.message);
      dispatch(clearErrors());
    }
    if(success) {
      alert.success("Review Submited Successfully");
      dispatch({type: NEW_REVIEW_RESET})
    }
    if(id.length === 24){
      dispatch(getProductDetails(id));
    } else {
      navigate(`/404`)
      
    }

    
  }, [dispatch, id, error, alert,reviewError,success,navigate]);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("")

  const increaseQuantity = () => {
    if (product.stock <= quantity) return alert.info("The stock has run out");
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addItemsToCartHandler = () => {
    if (isAuthenticated) {
      dispatch(addItemsToCart(id, quantity));
      dispatch(myCartItems());
      let info = message ? message : `Item Added To Cart`;
      alert.success(info);
    } else {
      alert.info("Please Login");
    }
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  }

  const reviewSubmitHandler =() =>{
    const myForm = new FormData();

    myForm.set("rating",rating);
    myForm.set("comment",comment);
    myForm.set("productId",id);

    dispatch(newReview(myForm));
    setOpen(false)

  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData
            title={`${product.name} -- ${process.env.REACT_APP_SITE_NAME}`}
          />
          <div className="productDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">({product.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹ ${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={increaseQuantity}>+</button>
                  </div>

                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addItemsToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Despripition : <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className="reviewHeading">REVIEWS</h3>
          
          <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating 
              onChange={(e)=> setRating(e.target.value)}
              value={rating}
              size="large"
               />
               <textarea
               className="sumbitDialogTextArea"
               cols="30"
               rows="5"
               value={comment}
               onChange={(e)=>setComment(e.target.value)}
               />

               

            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
              <Button onClick={reviewSubmitHandler} color="primary">Submit</Button>
            </DialogActions>

          </Dialog>





          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review,index) => <ReviewCard review={review} key={index} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </Fragment>
  );
}

export default ProductDetails;
