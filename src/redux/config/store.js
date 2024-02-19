import { createStore, combineReducers } from "redux";
import fanLettersReducer from "../modules/fanLetters";

const rootReducer = combineReducers({
  fanLetters: fanLettersReducer,
});

const store = createStore(rootReducer);

export default store;
