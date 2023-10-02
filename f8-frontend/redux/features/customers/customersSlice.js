import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customersService from "./customersService";
import { database_labels } from "../../../helpers";


const initialState = {
  isLoading: false,
  customers:[],
  editingPersona:{name:""},
  msg: "",
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
  displayingIndexes: [],
};
export const getCustomers = createAsyncThunk(
    "getcustomers",
    async (userData, thunkAPI) => {
        try{
            return await customersService.getCustomers(userData);
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
export const getCustomerName = createAsyncThunk(
    "getCustomerName",
    async (thunkAPI) => {
        try{
            return await customersService.getCustomerName();
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
export const getCustomerById = createAsyncThunk(
    "getcustomerbyid",
    async (customer, thunkAPI) => {
        try{
            return await customersService.getCustomerById(customer);
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
export const getEdiCustomer = createAsyncThunk(
    "getEdiCustomer",
    async (user, thunkAPI) => {
        try{
            return await customersService.getEdiCustomer(user);
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
export const saveCustomer = createAsyncThunk(
  "savecustomer",
  async (customer, thunkAPI) => {
    try {
      return await customersService.saveCustomer(customer);
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
export const updateCustomer = createAsyncThunk(
  "updatecustomer",
  async (customer, thunkAPI) => {
    try {
      return await customersService.updateCustomer(customer);
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
export const saveEdiCustomer = createAsyncThunk(
  "saveedicustomer",
  async (formdata, thunkAPI) => {
    try {
      return await customersService.saveEdiCustomer(formdata);
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
export const deleteCustomer = createAsyncThunk(
  "delete",
  async (customer, thunkAPI) => {
    try {
      return await customersService.deleteCustomer(customer);
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
export const productInput = createAsyncThunk(
  "customers/productInput",
  async (promptData, thunkAPI) => {
    try {
      const data = await customersService.productInput(promptData)
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


const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    CUSTOMERS_RESET(state) {
      state.isLoading = false;
      state.customers = [];
    },
    SET_CUSTOMERS(state, action){
      state.customers = action.payload
    },
    INIT_FORMDATA(state) {
      state.formData = {
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
      };
      state.displayingIndexes = [];
    },
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
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customers = action.payload;
        // toast.success(action.payload);
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.customers = [];
        // toast.success(action.payload);
      })
      .addCase(getCustomerName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomerName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editingPersona.name = action.payload.name;
        // toast.success(action.payload);
      })
      .addCase(getCustomerName.rejected, (state, action) => {
        state.isLoading = false;
        // toast.success(action.payload);
      })
      .addCase(getCustomerById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.editingPersona = action.payload;
        state.formData = action.payload.iCustomer;
        // toast.success(action.payload);
      })
      .addCase(getCustomerById.rejected, (state, action) => {
        state.isLoading = false;
        state.editingPersona = {};
        // toast.success(action.payload);
      })
      .addCase(saveCustomer.pending, (state, action) => {
        state.isLoading = true;
        // toast.success(action.payload);
      })
      .addCase(saveCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        // toast.success(action.payload);
      })
      .addCase(saveCustomer.rejected, (state, action) => {
        state.isLoading = false;
        // toast.success(action.payload);
      })
      .addCase(updateCustomer.pending, (state, action) => {
        state.isLoading = true;
        // toast.success(action.payload);
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success(action.message);
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoading = false;
        toast.success(action.error);
      })
      .addCase(saveEdiCustomer.pending, (state, action) => {
        state.isLoading = true;
        // toast.success(action.payload);
      })
      .addCase(saveEdiCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Ideal Customer Data is saved successfully.");
      })
      .addCase(saveEdiCustomer.rejected, (state, action) => {
        state.isLoading = false;
        toast.success("Ideal Customer Data cannot be saved.");
      })
      .addCase(deleteCustomer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(state.customers);
        // state.customers.filter((customer) => customer._id!=action.payload.id);
        // console.log(state.customers);
      })
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
      });
  },
});

export const { SET_FORMDATA, ADD_DISPLAYING_INDEXES, INIT_FORMDATA, CUSTOMERS_RESET } = customersSlice.actions;
export const selectFormData = (state) => state.customers.formData;
export const selectIsLoading = (state) => state.customers.isLoading;
export const selectDisplayingIndexes = (state) => state.customers.displayingIndexes;

export default customersSlice.reducer;