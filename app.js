// Core
import path from "path";

// External
import express from "express";
import "dotenv/config";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";

// Local
import authRouter from "./routes/authRouter.js";
import storeRouter from "./routes/storeRouter.js";
import hostRouter from "./routes/hostRouter.js";
import rootDir from "./utils/pathUtil.js";
import { get404 } from "./controllers/404Controller.js";
import { mongoConnect } from "./utils/databaseUtil.js";
import { isAuth } from "./controllers/authController.js";

const app = express();

// Setup session store
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

// View engine
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use(
  session({
    secret: "safely-rest-secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Attach login status to every view
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  res.locals.isLoggedIn = req.session.isLoggedIn;
  next();
});

// Routes
app.use("/", storeRouter);
app.use("/host", isAuth, hostRouter);
app.use(authRouter);

// 404 handler
app.use(get404);

// Start server
const PORT = process.env.PORT || 4000;
mongoConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`🟢 live at ${PORT}`);
  });
});
