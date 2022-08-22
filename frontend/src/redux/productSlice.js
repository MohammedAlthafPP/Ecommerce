import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../axios"


//create async thunk

export const getAllProductData =  createAsyncThunk(
    "productsData/getData",
    async (arg, {isRejectedWithValue}) => {

    try {
        
        const {data} = await axios.get("/products")
        console.log(data, "==========Data");
        return data;
        
    } catch (error) {
        isRejectedWithValue(error.response.data)
    }
});


// //for pending status update
// export const pendingStatus =  createAsyncThunk(
//     "application/getAppData",
//     async (arg, {isRejectedWithValue}) => {

//     try {
        
//         const {data} = await axios.put(`http://localhost:4000/pending/${arg}`)
//         return data;
//     } catch (error) {
//         isRejectedWithValue(error.response.data)
//     }
// });
// // approve status update
// export const approveStatus =  createAsyncThunk(
//     "application/getAppData",
//     async (arg, {isRejectedWithValue}) => {

//     try {
        
//         const {data} = await axios.put(`http://localhost:4000/approve/${arg}`)
//         return data;
//     } catch (error) {
//         isRejectedWithValue(error.response.data)
//     }
// });

// // decline status update
// export const declineStatus =  createAsyncThunk(
//     "application/getAppData",
//     async (arg, {isRejectedWithValue}) => {

//     try {
        
//         const {data} = await axios.put(`http://localhost:4000/decline/${arg}`)
//         return data;
//     } catch (error) {
//         isRejectedWithValue(error.response.data)
//     }
// });







//Application Slice

const productSlice = createSlice({
    name: "productsData",
    initialState: {
        data: [],
        isSuccess: false,
        message: "",
        loading:false,
    },
    reducers: {},
    extraReducers: {
        [getAllProductData.pending]: (state, {payload}) => {
            state.loading = true;
        },
        [getAllProductData.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.data = payload;
            state.isSuccess = true;
        },
        [getAllProductData.rejected]: (state, {payload}) => {
            state.message = payload;
            state.loading = false;
            state.isSuccess = false;
        },
    },

});


export default productSlice;