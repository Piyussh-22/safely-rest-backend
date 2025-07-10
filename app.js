//core
import path from "path";
//external
import express from "express";
//local
import userRouter from "./routes/userRouter.js";
import hostRouter from "./routes/hostRouter.js";
import rootDir from "./utils/pathUtil.js";

const app = express();

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// Serve static files from "public" folder (like CSS, images, etc.)
app.use(express.static(path.join(rootDir, "public")));

// Routers
app.use(userRouter);
app.use("/host", hostRouter);

// 404 Page Handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404page.html"));
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🟢 live at ${PORT}`);
});
