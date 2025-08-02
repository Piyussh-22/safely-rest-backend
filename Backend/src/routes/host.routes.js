import express from "express";
const hostRouter = express.Router();

import {
  getHostHouses,
  postAddHouse,
  updateHouse,
  deleteHouse,
} from "../controllers/host.controller.js";

// Add a new house
hostRouter.post("/add-house", postAddHouse);

// Update an existing house
hostRouter.put("/edit-house/:houseId", updateHouse);

// Delete a house
hostRouter.delete("/delete-house/:houseId", deleteHouse);

// Show all houses hosted by the user
hostRouter.get("/host-house-list", getHostHouses);

export default hostRouter;
