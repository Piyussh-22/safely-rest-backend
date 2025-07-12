// external module
import express from "express";
const hostRouter = express.Router();

// local module
import * as hostController from "../controllers/hostController.js";

hostRouter.get("/add-home", hostController.getAddHome);

hostRouter.post("/add-home", hostController.postAddHome);

export default hostRouter;
