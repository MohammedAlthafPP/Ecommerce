import React, { Fragment,useEffect } from "react";
import { SITE_NAME } from "../../constants/constants";
import { CgMouse } from "react-icons/all";
import Product from "./Product.js";
import "./Home.css";
import MetaData from "../layout/MetaData";

import {useSelector,useDispatch} from "react-redux";
import { getAllProductData } from "../../redux/productSlice";





const product = {
  name: "Blue Tshirt",
  price: "₹300",
  _id: "test_id",
  image: [
    {
      url:
        "https://rukminim1.flixcart.com/image/800/960/l1grgcw0/t-shirt/x/o/5/m-t428hs-tm5p-eyebogler-original-imagdf2egzjxeqgk.jpeg?q=50",
    },
  ],
};

function Home() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductData());
  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title="ECOMMERCE | Homepage"/>
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
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />

        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  );
}

export default Home;
