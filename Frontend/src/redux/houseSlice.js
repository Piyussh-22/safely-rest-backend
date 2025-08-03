import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allHouses: [], // For guests (public listing)
  hostHouses: [], // Houses added by logged-in host
  loading: false,
  error: null,
};

const houseSlice = createSlice({
  name: "houses",
  initialState,
  reducers: {
    setHouses: (state, action) => {
      state.allHouses = action.payload; // Full list for guests
    },
    setHostHouses: (state, action) => {
      state.hostHouses = action.payload; // Only for host dashboard
    },
    addHouse: (state, action) => {
      state.hostHouses.push(action.payload);
    },
    updateHouse: (state, action) => {
      const index = state.hostHouses.findIndex(
        (house) => house._id === action.payload._id
      );
      if (index !== -1) {
        state.hostHouses[index] = action.payload;
      }
    },
    deleteHouse: (state, action) => {
      state.hostHouses = state.hostHouses.filter(
        (house) => house._id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setHouses,
  setHostHouses,
  addHouse,
  updateHouse,
  deleteHouse,
  setLoading,
  setError,
} = houseSlice.actions;

export default houseSlice.reducer;
