import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [], // Array of house objects or IDs
};

const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    setFavourites: (state, action) => {
      state.favourites = action.payload; // Replace with fetched favourites
    },
    addFavourite: (state, action) => {
      if (!state.favourites.find((fav) => fav._id === action.payload._id)) {
        state.favourites.push(action.payload); // Add new favourite
      }
    },
    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter(
        (fav) => fav._id !== action.payload
      );
    },
    clearFavourites: (state) => {
      state.favourites = []; // Clear on logout
    },
  },
});

export const { setFavourites, addFavourite, removeFavourite, clearFavourites } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
