// External module
import express from "express";
const storeRouter = express.Router();

// Local modules
import * as storeController from "../controllers/storeController.js";

// Home page
storeRouter.get("/", storeController.getIndex);

// Show all houses
storeRouter.get("/house-list", storeController.getHouses);

// Show user's bookings
storeRouter.get("/bookings", storeController.getBookings);

// Show user's favourites
storeRouter.get("/favourite-list", storeController.getFavouriteList);

// Toggle favourite (add/remove)
storeRouter.post("/favourite-list", storeController.postAddToFavourites);

// Show details of a single house
storeRouter.get("/houses/:houseId", storeController.getHouseDetails);

// Remove house from favourites
storeRouter.post(
  "/favourites/delete/:houseId",
  storeController.postRemoveFavourite
);

export default storeRouter;
