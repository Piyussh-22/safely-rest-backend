// external module
import express from "express";
const storeRouter = express.Router();

//local modules
import * as storeController from "../controllers/storeController.js";

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/house-list", storeController.getHouses);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourite-list", storeController.getFavouriteList);

storeRouter.post("/favourite-list", storeController.postAddToFavourites);

storeRouter.get("/houses/:houseID", storeController.getHouseDetails);

storeRouter.post(
  "/favourites/delete/:houseId",
  storeController.postRemoveFavourite
);

export default storeRouter;
