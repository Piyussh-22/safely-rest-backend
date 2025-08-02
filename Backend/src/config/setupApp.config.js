import express from "express";
import cors from "cors";
import session from "express-session";

export const setupApp = (app, sessionStore) => {
  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is not defined in environment variables");
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(
    cors({
      origin: "http://localhost:5173", // React frontend
      credentials: true, // allow cookies
    })
  );

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        httpOnly: true,
        secure: false, // true only in production with HTTPS
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    })
  );

  console.log("✅ App middlewares and session configured");
};
