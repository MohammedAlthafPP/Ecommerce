import React, { Fragment, useState } from "react";
import "./NewCategory.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  craeteCategory,
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
import { NEW_CATEGORY_RESET } from "../../../../constants/categoryConstants";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../../layout/Loader/Loader";
function NewCategory() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success ,message} = useSelector((state) => state.newCategory);
  const { categoryList } = useSelector((state) => state.allCategories);

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");

  

  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success(message);
      navigate("/admin/categories");
      dispatch({ type: NEW_CATEGORY_RESET });
    }

    dispatch(getAllCategories());
  }, [dispatch, alert, error, success, navigate,message]);

  const createCategorySubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("parentId", parentId);

     dispatch(craeteCategory(myForm))
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
                className="createCategoryForm"
                encType="multipart/form-data"
                onSubmit={createCategorySubmitHandler}
              >
                <h1>Create Category</h1>
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

                    {categoryList&&createCategoryList(categoryList).map(
                      (option) => 
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      
                    )}
                  </select>
                </div>

                <Button
                  id="createCategoryBtn"
                  type="submit"
                 // disabled={loading ? true : false}
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

export default NewCategory;
