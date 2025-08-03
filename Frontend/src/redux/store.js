// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import houseReducer from "./houseSlice";
import favouriteReducer from "./favouriteSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    houses: houseReducer,
    favourites: favouriteReducer,
  },
});

export default store;
