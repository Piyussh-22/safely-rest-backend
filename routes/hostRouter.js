// External module
import express from "express";
const hostRouter = express.Router();

// Local controller
import * as hostController from "../controllers/hostController.js";

// Add a new house
hostRouter.get("/add-house", hostController.getAddHouse);
hostRouter.post("/add-house", hostController.postAddHouse);

// Edit an existing house
hostRouter.get("/edit-house/:houseId", hostController.getEditHouse);
hostRouter.post("/edit-house", hostController.postEditHouse);

// Delete a house
hostRouter.post("/delete-house/:houseId", hostController.postDeleteHouse);

// Show all houses hosted by the user
hostRouter.get("/host-house-list", hostController.getHostHouses);

export default hostRouter;
