// src/features/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id) => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    currentProduct: {},
    currentProductId: 1,
    status: "idle",
    error: null,
  },
  reducers: {
    nextProduct: (state) => {
      state.currentProductId += 1;
    },
    previousProduct: (state) => {
      if (state.currentProductId > 1) {
        state.currentProductId -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentProduct = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { nextProduct, previousProduct } = productSlice.actions;

export const selectCurrentProduct = (state) => state.product.currentProduct;
export const selectCurrentProductId = (state) => state.product.currentProductId;
export const selectStatus = (state) => state.product.status;
export const selectError = (state) => state.product.error;

export default productSlice.reducer;
