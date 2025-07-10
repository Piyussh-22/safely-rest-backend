// core module
import path from "path";

// external module
import express from "express";

// local module
import rootDir from "../utils/pathUtil.js";

const hostRouter = express.Router();

// GET route to show add-home form
hostRouter.get("/add-home", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "addHome.html"));
});

// POST route to process the form
hostRouter.post("/add-home", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "addHomeDone.html"));
});

export default hostRouter;
