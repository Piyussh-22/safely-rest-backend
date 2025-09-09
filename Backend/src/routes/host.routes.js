import express from "express";
import {
  getHostHouses,
  postAddHouse,
  updateHouse,
  deleteHouse,
} from "../controllers/host.controller.js";
import { protect, restrictTo } from "../middlewares/auth.js"; // updated

const hostRouter = express.Router();

// Add a new house (Host only)
hostRouter.post("/add-house", protect, restrictTo("host"), postAddHouse);

// Update an existing house (Host only)
hostRouter.put(
  "/edit-house/:houseId",
  protect,
  restrictTo("host"),
  updateHouse
);

// Delete a house (Host only)
hostRouter.delete(
  "/delete-house/:houseId",
  protect,
  restrictTo("host"),
  deleteHouse
);

// Show all houses hosted by this user (Host only)
hostRouter.get("/hostHouses", protect, restrictTo("host"), getHostHouses);

export default hostRouter;
