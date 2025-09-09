import express from "express";
import {
  getHouses,
  getHouseDetails,
  getFavouriteList,
  toggleFavourite,
  deleteFavourite,
} from "../controllers/store.controller.js";
import { protect, restrictTo } from "../middlewares/auth.js";

const storeRoutes = express.Router();

// Public: All houses
storeRoutes.get("/houses", getHouses);

// Public: House details by ID
storeRoutes.get("/houses/:houseId", getHouseDetails);

// Authenticated: User's favourites
storeRoutes.get(
  "/favourites",
  protect,
  restrictTo("guest", "host"),
  getFavouriteList
);

// Authenticated: Add or remove from favourites
storeRoutes.post(
  "/favourites",
  protect,
  restrictTo("guest", "host"),
  toggleFavourite
);

// Authenticated: Remove from favourites
storeRoutes.delete(
  "/favourites/:houseId",
  protect,
  restrictTo("guest", "host"),
  deleteFavourite
);

export default storeRoutes;
