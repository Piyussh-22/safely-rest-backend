// routes/admin.routes.js
import express from "express";
import { protect, restrictTo } from "../middlewares/auth.js";
import { getAdminStats } from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.get("/stats", protect, restrictTo("admin"), getAdminStats);

export default adminRouter;
