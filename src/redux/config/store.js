import { configureStore } from "@reduxjs/toolkit";
import fanLettersReducer from "../modules/fanLettersSlice";
import auth from "../modules/authSlice";

export const store = configureStore({
  reducer: {
    fanLetters: fanLettersReducer,
    auth,
  },
});

export default store;
