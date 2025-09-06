// External
import express from "express";
import "dotenv/config";

// Local
import authRoutes from "./src/routes/auth.routes.js";
import storeRoutes from "./src/routes/store.routes.js";
import hostRoutes from "./src/routes/host.routes.js";
import { connectDB } from "./src/utils/db.util.js";
import { authenticate } from "./src/middlewares/authenticate.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { setupApp } from "./src/config/setupApp.config.js";
import { createSessionStore } from "./src/config/session.config.js";
import { ROLES } from "./src/constants/roles.js";

const app = express();

// Setup MongoDB session store
const sessionStore = createSessionStore();

// Apply all middlewares from config
setupApp(app, sessionStore);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/host", authenticate([ROLES.HOST]), hostRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`✅ Server running at http://localhost:${PORT}`)
  );
});
