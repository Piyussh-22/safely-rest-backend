import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [], // houseIds
};

const favSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addToFav: (state, action) => {
      state.favourites.push(action.payload);
    },
    removeFromFav: (state, action) => {
      state.favourites = state.favourites.filter(
        (item) => item._id !== action.payload._id
      );
    },
  },
});

export const { addToFav, removeFromFav } = favSlice.actions;

export default favSlice.reducer;
