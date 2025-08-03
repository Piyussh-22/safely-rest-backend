// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // { id, name, email, type: "guest" | "host" }
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload; // Full user object
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
