import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import openaiService from "./openaiService";
import { database_labels } from "../../../helpers";

const initialState = {
  isLoading: false,
  isSuccess: false,
  message: "",
  isError: false,
  formData: {
    goals: "",
    product_service: "",
    productservice_type: "",
    productservice_name: "",
    productservice_brand: "",
    productservice_price: "",
    target_location: "",
    uDecMaker:"yes",
    ...database_labels.reduce((acc, label) => {
      acc[label] = "";
      return acc;
    }, {})
  },
  displayingIndexes: []
};

// Login User
export const productInput = createAsyncThunk(
  "openai/productInput",
  async (promptData, thunkAPI) => {
    try {
      const data = await openaiService.productInput(promptData)
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const generalAsking = createAsyncThunk(
  "openai/generalAsking",
  async (prompt, thunkAPI) => {
    try {
      const data = await openaiService.generalAsking(prompt);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const openaiSlice = createSlice({
  name: "openai",
  initialState,
  reducers: {
    SET_FORMDATA(state, action) {
      const inputData = action.payload
      state.formData = { ...state.formData, ...inputData }
    },
    ADD_DISPLAYING_INDEXES(state, action) {
      state.displayingIndexes = [...state.displayingIndexes, action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(productInput.pending, (state) => {
        state.isLoading = true;
        toast.info('Processing. please wait... ');
      })
      .addCase(productInput.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        state.formData = { ...state.formData, ...action.payload }
        toast.success('Processing completed');
      })
      .addCase(productInput.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(generalAsking.pending, (state) => {
        state.isLoading = true;
        toast.info('Processing. please wait... ');
      })
      .addCase(generalAsking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
        toast.success('Processing completed');
      })
      .addCase(generalAsking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
  }

});
export const { SET_FORMDATA, ADD_DISPLAYING_INDEXES } =
  openaiSlice.actions;
export const selectFormData = (state) => state.openai.formData;
export const selectIsLoading = (state) => state.openai.isLoading;
export const selectDisplayingIndexes = (state) => state.openai.displayingIndexes;

export default openaiSlice.reducer;
