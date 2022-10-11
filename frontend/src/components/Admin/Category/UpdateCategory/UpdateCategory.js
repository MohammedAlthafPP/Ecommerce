import React, { Fragment, useState } from "react";
//import "./NewCategory.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  getCategoryDetails,
  updateCategory,
  clearErrors,
} from "../../../../redux/actions/categoryAction";
import { useAlert } from "react-alert";
import MetaData from "../../../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "../../Dashboard/Sidebar";
import { UPDATE_CATEGORY_RESET } from "../../../../constants/categoryConstants";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../../layout/Loader/Loader";

function UpdateCategory() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();

  const { categoryList } = useSelector((state) => state.allCategories);
  const { error: categoryError, category, loading } = useSelector(
    (state) => state.categoryDetails
  );
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
    message,
  } = useSelector((state) => state.category);

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");

  useEffect(() => {
    if (categoryError) {
      alert.error(categoryError.message);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError.message);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success(message);
      async function removeCategory() {
        await localStorage.removeItem("Ucategory");
      }
      removeCategory();
      navigate("/admin/categories");
      dispatch({ type: UPDATE_CATEGORY_RESET });
    }

    dispatch(getCategoryDetails(id));
    dispatch(getAllCategories());
  }, [
    dispatch,
    alert,
    updateError,
    categoryError,
    isUpdated,
    navigate,
    message,
    id,
    useParams,
  ]);

  useEffect(() => {
    if (category) {
      window.localStorage.setItem(
        "Ucategory",
        JSON.stringify(category && category)
      );
    }
    const categoryDetails = JSON.parse(localStorage.getItem("Ucategory"));

    if (categoryDetails && Object.keys(categoryDetails).length === 0) {
    } else {
      if (categoryDetails && categoryDetails._id === id) {
        setName(category && category.name);
        setParentId(category && category.parentId);
      }
    }
  }, [category]);

  const createCategorySubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("parentId", parentId);

    dispatch(updateCategory(id, myForm));
  };

  const createCategoryList = (categories, options = []) => {
    if (categories) {
      for (let category of categories) {
        options.push({ value: category._id, name: category.name });
        if (category && category.children.length > 0) {
          createCategoryList(category.children, options);
        }
      }
      return options;
    }
  };

  return (
    <Fragment>
      {loading || updateLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData
            title={`${"Update Category -Admin"} -- ${
              process.env.REACT_APP_SITE_NAME
            }`}
          />
          <div className="dashboard">
            <SideBar />
            <div className="newProductContainer">
              <form
                action=""
                className="createCategoryForm"
                encType="multipart/form-data"
                onSubmit={createCategorySubmitHandler}
              >
                <h1>Update Category</h1>
                <div>
                  <SpellcheckIcon />
                  <input
                    type="text"
                    placeholder="Category Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <AccountTreeIcon />
                  <select onChange={(e) => setParentId(e.target.value)}>
                    <option value="">Choose Parent Category</option>

                    {categoryList &&
                      createCategoryList(categoryList).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                  </select>
                </div>

                <Button
                  id="createCategoryBtn"
                  type="submit"
                   disabled={loading || name === "" ? true : false}
                >
                  Update
                </Button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UpdateCategory;
