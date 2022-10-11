import React, { Fragment, useState } from "react";
import "./newProduct.css";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateProduct,
  clearErrors,
} from "../../../../redux/actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../../../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "../../Dashboard/Sidebar";
import { NEW_PRODUCT_RESET } from "../../../../constants/productConstants";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../../layout/Loader/Loader";
import { getAllCategories } from "../../../../redux/actions/categoryAction";
function NewProduct() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { categoryList } = useSelector((state) => state.allCategories);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreviw, setImagesPreviw] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom Wear",
    "Top Wear",
    "Camera",
    "SmartPhone",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }

    dispatch(getAllCategories());
  }, [dispatch, alert, error, success, navigate]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(CreateProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreviw([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreviw((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  
  const createCategoryList = (categories, options = []) => {
    if (categories) {
      for (let category of categories) {
        options.push({ value: category._id, name: category.name });
        if (category&&category.children.length > 0) {
          createCategoryList(category.children, options);
        }
      }
      return options;
    }

  };



  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData
            title={`${"Create Product -Admin"} -- ${
              process.env.REACT_APP_SITE_NAME
            }`}
          />
          <div className="dashboard">
            <SideBar />
            <div className="newProductContainer">
              <form
                action=""
                className="createproductForm"
                encType="multipart/form-data"
                onSubmit={createProductSubmitHandler}
              >
                <h1>Create Product</h1>
                <div>
                  <SpellcheckIcon />
                  <input
                    type="text"
                    placeholder="Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <AttachMoneyIcon />
                  <input
                    type="number"
                    placeholder="Price"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div>
                  <DescriptionIcon />
                  <textarea
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    cols="30"
                    rows="1"
                  ></textarea>
                </div>

                {/* <div>
                  <AccountTreeIcon />
                  <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Choose Category</option>
                    {categories.map((cate) => (
                      <option key={cate} value={cate}>
                        {cate}
                      </option>
                    ))}
                  </select>
                </div> */}

                <div>
                  <AccountTreeIcon />
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    <option value="">Choose Category</option>

                    {categoryList &&
                      createCategoryList(categoryList).map((option) => (
                        <option key={option.value} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <StorageIcon />
                  <input
                    type="number"
                    placeholder="Stock"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div id="createProductFormFile">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={createProductImagesChange}
                    multiple
                  />
                </div>

                <div id="createProductFormImage">
                  {imagesPreviw.map((image, index) => (
                    <img key={index} src={image} alt="Avatar Preview" />
                  ))}
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  Create
                </Button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default NewProduct;
