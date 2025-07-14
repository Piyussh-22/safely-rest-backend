// external module
import express from "express";
const storeRouter = express.Router();

//local modules
import * as storeController from "../controllers/storeController.js";

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/home-list", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourite-list", storeController.getFavouriteList);

storeRouter.post("/favourite-list", storeController.postAddToFavourites);

storeRouter.get("/homes/:homeId", storeController.getHomeDetails);
export default storeRouter;
