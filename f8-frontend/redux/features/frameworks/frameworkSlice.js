import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import frameworkService from "./frameworkService";
import {handleError} from "@/redux/handle";
import { toast } from "react-toastify"


const initialState = {
  editingFramework : {

  },
  isError: false,
  isLoading: false,
  message: "",
};


export const saveFramework = createAsyncThunk(
    "framework/saveFramework",
    async (template, thunkAPI) => {
        try{
            return await frameworkService.saveFramework(template);
        } catch (error) {
          handleError(error, thunkAPI);
        }
    }
);

const frameworkSlice = createSlice({
    name: "framework",
    initialState,
    reducers: {
      TEMP_RESET(state) {
        state.newTemp = {};
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(saveFramework.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(saveFramework.fulfilled, (state, action) => {
          state.isLoading = false;
          state.templates = [...state.templates, action.payload]
          toast.success("Success");
        })
        .addCase(saveFramework.rejected, (state, action) => {
          state.isLoading = false;
          toast.success(action.payload);
        })
    },
  });
export const { AGENTS_RESET, SET_TEMP, TEMP_RESET } = frameworkSlice.actions;

export default frameworkSlice.reducer;