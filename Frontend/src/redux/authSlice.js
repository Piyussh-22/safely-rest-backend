// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // { id, name, email, role: "guest" | "host" }
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = {
        id: action.payload.id,
        name: action.payload.name || "",
        email: action.payload.email,
        role: action.payload.role || "guest", // default role fallback
        ...action.payload, // keep any extra fields from backend
      };
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
