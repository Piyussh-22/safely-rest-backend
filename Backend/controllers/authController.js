import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
// GET: Signup Page
export const getSignup = (req, res) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    currentPage: "signup",
    errorMessage: null,
    isLoggedIn: req.session.isLoggedIn || false,
    oldInput: {},
  });
};

export const postSignup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    userType,
    terms,
  } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      pageTitle: "Signup",
      currentPage: "signup",
      errorMessage: errors.array()[0].msg,
      isLoggedIn: req.session.isLoggedIn || false,
      oldInput: { firstName, lastName, email, userType },
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        errorMessage: "Email is already registered",
        isLoggedIn: req.session.isLoggedIn || false,
        oldInput: { firstName, lastName, email, userType },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType,
    });

    await newUser.save();

    res.redirect("/login");
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("Internal Server Error");
  }
};

// GET: Login Page
export const getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "LogIn",
    errorMessage: null,
    isLoggedIn: req.session.isLoggedIn || false, // Safe fallback
  });
};

// POST: Handle Login
export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).render("auth/login", {
        pageTitle: "Login",
        currentPage: "LogIn",
        errorMessage: "Invalid email or password",
        isLoggedIn: false,
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).render("auth/login", {
        pageTitle: "Login",
        currentPage: "LogIn",
        errorMessage: "Invalid email or password",
        isLoggedIn: false,
      });
    }

    // Create session
    req.session.isLoggedIn = true;
    req.session.user = {
      id: existingUser._id,
      name: existingUser.firstName,
      type: existingUser.userType,
    };

    req.session.save(() => {
      res.redirect("/");
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Internal Server Error");
  }
};

// POST: Logout
export const postLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

export const isAuth = (req, res, next) => {
  if (req.isLoggedIn) {
    return next();
  }
  res.redirect("/login");
};
