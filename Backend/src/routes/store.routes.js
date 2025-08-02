import express from "express";
import {
  getHouses,
  getHouseDetails,
  getFavouriteList,
  toggleFavourite,
  deleteFavourite,
} from "../controllers/store.controller.js";

const storeRoutes = express.Router();

// GET: All houses
storeRoutes.get("/houses", getHouses);

// GET: House details by ID
storeRoutes.get("/houses/:houseId", getHouseDetails);

// GET: User's favourites
storeRoutes.get("/favourites", getFavouriteList);

// POST: Add or remove from favourites (toggle)
storeRoutes.post("/favourites", toggleFavourite);

// DELETE: Remove from favourites
storeRoutes.delete("/favourites/:houseId", deleteFavourite);

export default storeRoutes;
