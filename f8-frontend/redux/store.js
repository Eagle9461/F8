import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import emailReducer from "./features/email/emailSlice";
import filterReducer from "./features/auth/filterSlice";
import openaiReducer from "./features/openai/openaiSlice";
import paymentService from "./features/payment/payment";
import customersReducer from "./features/customers/customersSlice";
import agentsReducer from "./features/agents/agentsSlice";

const reducer = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
    filter: filterReducer,
    openai: openaiReducer,
    customers: customersReducer,
    agents: agentsReducer,
    payment: paymentService,
  },
});

export default reducer;