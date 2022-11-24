import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  products: [],
  payload: "",
  error: "",
  addedStatus:"",
  updatedStatus:"",
  deletedStatus:""
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
    const res = await axios.get("https://dummyjson.com/carts/1")
    return res.data.products;
});
export const addCart = createAsyncThunk("cart/addCart", async (obj) => {
    const res = await axios.post("https://dummyjson.com/carts/add",obj)
    return res.data.products;

});
export const updateCart = createAsyncThunk("cart/updateCart", async (obj) => {
  const res = await axios.put("https://dummyjson.com/carts/1",obj)
  return res.data.products;

});
export const deleteCart = createAsyncThunk("cart/deleteCart", async () => {
    const res = await axios.delete("https://dummyjson.com/carts/1");
    return res.data.isDeleted;

});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearErrorStatuses:(state)=>{
      state.addedStatus="";
      state.updatedStatus="";
      state.deletedStatus="";
    },
  },
  extraReducers:(builder)=>{
    builder
    .addCase(fetchCart.fulfilled,(state, action) => {
      state.products = action.payload;
      state.loading = false;
    })
    .addCase(fetchCart.pending,(state) => {
      state.loading = true;
    })
    .addCase(fetchCart.rejected,(state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
    .addCase(addCart.fulfilled,(state, action) => {
      state.products = state.products.concat(action.payload);
      state.loading = false;
      state.addedStatus=true;
    })
    .addCase(addCart.pending,(state) => {
      state.loading = true;
    })
    .addCase(addCart.rejected,(state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.addedStatus=false;
    })
    .addCase(updateCart.fulfilled,(state,action) => {
      state.products = action.payload;
      state.loading = false;
      state.updatedStatus=true;
    })
    .addCase(updateCart.pending,(state) => {
      state.loading = true;
    })
    .addCase(updateCart.rejected,(state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.updatedStatus=false;
    })
    .addCase(deleteCart.fulfilled,(state,action) => {
      state.loading = false;
      state.deletedStatus=action.payload;
    })
    .addCase(deleteCart.pending,(state) => {
      state.loading = true;
    })
    .addCase(deleteCart.rejected,(state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.deletedStatus=false;
    })
  },
});

export const {clearErrorStatuses}=cartSlice.actions;
export default cartSlice.reducer
