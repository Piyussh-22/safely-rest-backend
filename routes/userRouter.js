// core module
import path from "path";

// external module
import express from "express";

// local module
import rootDir from "../utils/pathUtil.js";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "home.html"));
});

export default userRouter;
