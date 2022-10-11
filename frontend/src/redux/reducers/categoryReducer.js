import {
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_RESET,
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
    UPDATE_CATEGORY_RESET,
    UPDATE_CATEGORY_FAIL,
    CLEAR_ERRORS
  } from "../../constants/categoryConstants";
  
  // Create New Products
  export const newCategoryReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_CATEGORY_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          message: action.payload.message,
        };
      case NEW_CATEGORY_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_CATEGORY_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  



  // All Categories --Admin
export const allCategoriesReducer = (state = {categoryList:[]}, action) => {
    switch (action.type) {
        case ALL_CATEGORIES_REQUEST:
            return {
                loading : true,
            };
        case ALL_CATEGORIES_SUCCESS : 
            return {
                loading: false,
                categoryList: action.payload,
            };
        case ALL_CATEGORIES_FAIL : 
            return {
                loading: false,
                error : action.payload,
            };
        case CLEAR_ERRORS : 
            return {
                ...state,
                error : null,
            };
        default:
           return state;
    }

};


// Single Category
export const categoryDetailsReducer = (state = {category:{}}, action) => {
    switch (action.type) {
        case GET_CATEGORY_REQUEST:
            return {
                loading : true,
            };
        case GET_CATEGORY_SUCCESS : 
            return {
                loading: false,
                category : action.payload,
            };
        case GET_CATEGORY_FAIL : 
            return {
                loading: false,
                error : action.payload,
            };
        case CLEAR_ERRORS : 
            return {
                ...state,
                error : null,
            };
        default:
           return state;
    }

};


// Orders Reducer update and Delete --Admin
export const categoryReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_CATEGORY_REQUEST:
        case DELETE_CATEGORY_REQUEST:
            return {
                ...state,
                loading : true,
            };
        case UPDATE_CATEGORY_SUCCESS : 
            return {
                ...state,
                loading: false,
                isUpdated : action.payload.success,
                message: action.payload.message,
            };
        case DELETE_CATEGORY_SUCCESS : 
            return {
                ...state,
                loading: false,
                isDeleted : action.payload.success,
                message: action.payload.message
            };

        case UPDATE_CATEGORY_FAIL : 
        case DELETE_CATEGORY_FAIL : 
            return {
                ...state,
                loading: false,
                error : action.payload,
            };
        case UPDATE_CATEGORY_RESET : 
            return {
                ...state,
                isUpdated : false,
                message: null,
            };
        case DELETE_CATEGORY_RESET : 
            return {
                ...state,
                isDeleted : false,
                message: null,
            };
        case CLEAR_ERRORS : 
            return {
                ...state,
                error : null,
            };
        default:
           return state;
    }

};