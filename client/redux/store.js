import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import postReducer from "./reducers/slice/postSlice";

const store = configureStore({
  reducer : {
    posts: postReducer,
  },
});

export default store;