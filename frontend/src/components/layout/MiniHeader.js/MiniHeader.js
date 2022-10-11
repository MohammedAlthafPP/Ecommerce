import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../../redux/actions/categoryAction";
import "./MiniHeader.css";

function MiniHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {categoryList } = useSelector(
    (state) => state.allCategories
  );

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const renderCategories = (categories) => {
    let categoryArray = [];

    for (let category of categories) {
      categoryArray.push(
        <li key={category.name}>

            {
                category.parentId ? <a href={category.name}>{category.name}</a> :
                <span>{category.name}</span>
            }
          
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return categoryArray;
  };

  return <div className={categoryList&& categoryList.length > 0 ? 'menuHeader' :'menuHeaderHide'} >

            <ul>
              {categoryList&& categoryList.length > 0 ?   renderCategories(categoryList) :null}
            </ul>
           
  
  </div>;
}

export default MiniHeader;
