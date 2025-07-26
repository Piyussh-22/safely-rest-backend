import express from "express";
import { getLogin, postLogin } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);
authRouter.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

export default authRouter;
