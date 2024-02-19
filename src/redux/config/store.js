import { configureStore } from "@reduxjs/toolkit";
import fanLettersReducer from "../modules/fanLettersSlice";
import authReducer from "../modules/authSlice";

export const store = configureStore({
  reducer: {
    fanLetters: fanLettersReducer,
    auth: authReducer,
  },
});

export default store;
