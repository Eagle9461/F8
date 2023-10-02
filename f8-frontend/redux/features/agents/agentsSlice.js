import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import agentsService from "./agentsService"
import {handleError} from "@/redux/handle";
import { toast } from "react-toastify"


const initialState = {
  isLoggedIn: false,
  topics: {},
  templates:[
  ],
  newTemp:{

  },
  storySequences: [""],
  originalContent: {
    settingId:1,
    settedContents:[],
  },
  decided:{
    topic:"",
    storySequence:"",
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  selected:{},
};


export const getAgents = createAsyncThunk(
    "getagents",
    async (userData, thunkAPI) => {
        try{
            return await agentsService.getAgents(userData);
        } catch (error) {
          handleError(error, thunkAPI);
        }
    }
);
export const getStorySequence = createAsyncThunk(
    "getStorySequence",
    async (userData, thunkAPI) => {
        try{
            return await agentsService.getStorySequence(userData);
        } catch (error) {
          handleError(error, thunkAPI);
        }
    }
);
export const persuade = createAsyncThunk(
    "persuade",
    async (userData, thunkAPI) => {
        try{
            return await agentsService.persuade(userData);
        } catch (error) {
          handleError(error, thunkAPI);
        }
    }
);
export const getTemplates = createAsyncThunk(
    "agents/getTemplates",
    async (filter, thunkAPI) => {
        try{
            return await agentsService.getTemplates(filter);
        } catch (error) {
          handleError(error, thunkAPI);
        }
    }
);
export const getTemplateById = createAsyncThunk(
    "agents/getTemplateById",
    async (id, thunkAPI) => {
        try{
            return await agentsService.getTemplateById(id);
        } catch (error) {
          handleError(error, thunkAPI);
        }
    }
);
export const saveTemplate = createAsyncThunk(
    "agents/saveTemplate",
    async (template, thunkAPI) => {
        try{
            return await agentsService.saveTemplate(template);
        } catch (error) {
          handleError(error, thunkAPI);
        }
    }
);
export const deleteTemplate = createAsyncThunk(
    "agents/deleteTemplate",
    async (template, thunkAPI) => {
        try{
            return await agentsService.deleteTemplate(template);
        } catch (error) {
          handleError(error, thunkAPI);
        }
    }
);

const agentsSlice = createSlice({
    name: "agents",
    initialState,
    reducers: {
      AGENTS_RESET(state) {
        state.isLoading = false;
        state.topics = [];
      },
      SET_AGENTS(state, action){
        state.topics = action.payload
      },
      SET_TEMP(state, action){
        let inputData = action.payload;
        state.newTemp = { ...state.newTemp, ...inputData };
      },
      TEMP_RESET(state) {
        state.newTemp = {};
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAgents.pending, (state) => {
          state.isLoading = true;
          // state.topics=[];
        })
        .addCase(getAgents.fulfilled, (state, action) => {
          state.isLoading = false;
          state.topics = {...state.topics, ...action.payload}
          toast.success("Success");
        })
        .addCase(getAgents.rejected, (state, action) => {
          state.isLoading = false;
          // state.topics = [];
          toast.success(action.payload);
        })
        .addCase(getStorySequence.pending, (state) => {
          state.isLoading = true;
          state.storySequences=[];
        })
        .addCase(getStorySequence.fulfilled, (state, action) => {
          state.isLoading = false;
          // console.log(action.payload);
          state.storySequences = action.payload;
        //   toast.success("Success");
        })
        .addCase(getStorySequence.rejected, (state, action) => {
          state.isLoading = false;
          state.storySequences = [];
          // toast.success(action.payload);
        })
        .addCase(persuade.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(persuade.fulfilled, (state, action) => {
          state.isLoading = false;
          toast.success("Success");
        })
        .addCase(persuade.rejected, (state, action) => {
          state.isLoading = false;
          toast.success(action.payload);
        })
        .addCase(getTemplates.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getTemplates.fulfilled, (state, action) => {
          state.isLoading = false;
          state.templates = action.payload;
          toast.success("Success");
        })
        .addCase(getTemplates.rejected, (state, action) => {
          state.isLoading = false;
          toast.success(action.payload);
        })
        .addCase(getTemplateById.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getTemplateById.fulfilled, (state, action) => {
          state.isLoading = false;
          state.newTemp = action.payload;
          toast.success("Success");
        })
        .addCase(getTemplateById.rejected, (state, action) => {
          state.isLoading = false;
          toast.success(action.payload);
        })
        .addCase(saveTemplate.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(saveTemplate.fulfilled, (state, action) => {
          state.isLoading = false;
          state.templates = [...state.templates, action.payload]
          toast.success("Success");
        })
        .addCase(saveTemplate.rejected, (state, action) => {
          state.isLoading = false;
          toast.success(action.payload);
        })
    },
  });
export const { AGENTS_RESET, SET_TEMP, TEMP_RESET } = agentsSlice.actions;

export const selectTopics = (state) => state.agents.topics;

export default agentsSlice.reducer;