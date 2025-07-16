// external module
import express from "express";
const hostRouter = express.Router();

// local controller
import * as hostController from "../controllers/hostController.js";

// 🟢 Add House (Form + Submission)
hostRouter.get("/add-house", hostController.getAddHouse); // GET Form
hostRouter.post("/add-house", hostController.postAddHouse); // POST Save New

// 🟡 Edit House (Form + Submission)
hostRouter.get("/edit-house/:houseID", hostController.getEditHouse); // GET Form
hostRouter.post("/edit-house", hostController.postEditHouse); // POST Update

// 🔴 Delete House
hostRouter.post("/delete-house/:houseID", hostController.postDeleteHouse);

// 🟣 Show All Houses (List)
hostRouter.get("/host-house-list", hostController.getHostHouses);

// DONE
export default hostRouter;
