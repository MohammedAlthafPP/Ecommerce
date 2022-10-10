import axios from "../../axios";
import {
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_FAIL,
    ALL_CATEGORIES_REQUEST,
    ALL_CATEGORIES_SUCCESS,
    ALL_CATEGORIES_FAIL,
    GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_RESET,
    DELETE_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    CLEAR_ERRORS
  } from "../../constants/categoryConstants";


  // CREATE Category
  export const craeteCategory = (categoryData) =>async (dispatch) => {
    try {
        dispatch({type : NEW_CATEGORY_REQUEST });

        const config = {
            headers : {
                "Content-Type" : "application/json",
            },
        };

        const {data} = await axios.post(`/admin/category/new`,categoryData,config);

        dispatch({
            type : NEW_CATEGORY_SUCCESS,
            payload : data,
        });
        
    } catch (error) {
        dispatch({
            type : NEW_CATEGORY_FAIL,
            payload : error.response.data,
        })
        
    }

  };


  // Get All Categories 
 export const getAllCategories = () =>async (dispatch) => {
    try {
        dispatch({type : ALL_CATEGORIES_REQUEST});


        const {data} = await axios.get(`/admin/categories`);


        dispatch({
            type : ALL_CATEGORIES_SUCCESS,
            payload : data.categoryList,
        });
        
    } catch (error) {
        dispatch({
            type : ALL_CATEGORIES_FAIL,
            payload : error.response.data,
        })
        
    }

  };


  // Single Category Deatiils
 export const getCategoryDetails = (id) =>async (dispatch) => {
    try {
        dispatch({type : GET_CATEGORY_REQUEST});


        const {data} = await axios.get(`/admin/category/${id}`);
      

        dispatch({
            type : GET_CATEGORY_SUCCESS,
            payload : data.category,
        });
        
    } catch (error) {
        dispatch({
            type : GET_CATEGORY_FAIL,
            payload : error.response.data,
        })
        
    }

  };


  // Update category --Admin
  export const updateCategory = (id,categoryData) =>async (dispatch) => {
    try {
        dispatch({type : UPDATE_CATEGORY_REQUEST });

        const config = {
            headers : {
                "Content-Type" : "application/json",
            },
        };

        const {data} = await axios.put(`/admin/category/${id}`,categoryData,config);

        dispatch({
            type : UPDATE_CATEGORY_SUCCESS,
            payload : data,
        });
        
    } catch (error) {
        dispatch({
            type : UPDATE_CATEGORY_FAIL,
            payload : error.response.data,
        })
        
    }

  };


   // Delete Category --Admin
   export const deleteCategory = (id) =>async (dispatch) => {
    try {
        dispatch({type : DELETE_CATEGORY_REQUEST });


        const {data} = await axios.delete(`/admin/category/${id}`);

        dispatch({
            type : DELETE_CATEGORY_SUCCESS,
            payload : data,
        });
        
    } catch (error) {
        dispatch({
            type : DELETE_CATEGORY_FAIL,
            payload : error.response.data,
        })
        
    }

  };


    // Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };