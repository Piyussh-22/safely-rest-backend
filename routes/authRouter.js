import { body } from "express-validator";
import express from "express";
import {
  getLogin,
  postLogin,
  getSignup,
  postSignup,
  postLogout,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);
authRouter.get("/signup", getSignup);

authRouter.post(
  "/signup",
  [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
    body("userType")
      .isIn(["guest", "host"])
      .withMessage("User type must be guest or host"),
    body("terms")
      .equals("on")
      .withMessage("You must accept the terms and conditions"),
  ],
  postSignup
);

authRouter.post("/logout", postLogout);

export default authRouter;
