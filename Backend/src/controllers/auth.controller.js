import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

// POST: Signup
export const postSignup = async (req, res) => {
  const { firstName, lastName, email, password, userType } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  try {
    const emailNormalized = email.toLowerCase();
    const existingUser = await User.findOne({ email: emailNormalized });
    if (existingUser) {
      return res.status(422).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      firstName,
      lastName,
      email: emailNormalized,
      password: hashedPassword,
      userType,
    });

    await newUser.save();

    // create session immediately (auto-login)
    req.session.isLoggedIn = true;
    req.session.user = {
      id: newUser._id,
      name: newUser.firstName,
      role: newUser.userType,
    };

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: req.session.user,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// POST: Login
export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailNormalized = email.toLowerCase();
    const user = await User.findOne({ email: emailNormalized }).select(
      "+password"
    );
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Create session
    req.session.isLoggedIn = true;
    req.session.user = {
      id: user._id,
      name: user.firstName,
      role: user.userType, // guest, host
    };

    return res.json({
      success: true,
      message: "Login successful",
      user: req.session.user,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// POST: Logout
export const postLogout = (req, res) => {
  req.session.destroy(() => {
    return res.json({ success: true, message: "Logged out successfully" });
  });
};
