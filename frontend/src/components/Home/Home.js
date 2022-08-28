import React, { Fragment, useEffect } from "react";
import { SITE_NAME } from "../../constants/constants";
import { CgMouse } from "react-icons/all";
import Product from "./ProductCard.js";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { clearErrors, getProducts } from "../../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";


function Home() {
  
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(clearErrors());
    }

    dispatch(getProducts());
  }, [dispatch, error, alert]);

  return (
    <Fragment>

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
              
          <MetaData title={`${process.env.REACT_APP_SITE_NAME}`} />
          <div className="banner">
            <p>Welcome to {SITE_NAME}</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />{" "}
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
