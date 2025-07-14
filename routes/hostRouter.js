// external module
import express from "express";
const hostRouter = express.Router();

// local module
import * as hostController from "../controllers/hostController.js";

hostRouter.get("/add-home", hostController.getAddHome);

hostRouter.post("/add-home", hostController.postAddHome);

hostRouter.get("/host-home-list", hostController.getHostHomes);

hostRouter.get("/edit-home/:homeId", hostController.getEditHome);

hostRouter.post("/edit-home", hostController.postEditHome);

export default hostRouter;
