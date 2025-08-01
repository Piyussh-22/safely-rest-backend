import { configureStore } from "@reduxjs/toolkit";
import favReducer from "./favSlice";

const store = configureStore({
  reducer: {
    favourite: favReducer,
  },
});

export default store;
