//core
import path from "path";
//external
import express from "express";
import "dotenv/config";
//local
import storeRouter from "./routes/storeRouter.js";
import hostRouter from "./routes/hostRouter.js";
import rootDir from "./utils/pathUtil.js";
import { get404 } from "./controllers/404Controller.js";
import { mongoConnect } from "./utils/databaseUtil.js";

const app = express();

//ejs boilerplate
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// Serve static files from "public" folder (like CSS, images, etc.)
app.use(express.static(path.join(rootDir, "public")));

// Routers
app.use("/", storeRouter);
app.use("/host", hostRouter);

// 404 Page Handler
app.use(get404);

// Start server
const PORT = 4000;
mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`🟢 live at ${PORT}`);
  });
});
