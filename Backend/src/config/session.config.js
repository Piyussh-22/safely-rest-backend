import connectMongoDBSession from "connect-mongodb-session";
import session from "express-session";

export const createSessionStore = () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  const MongoDBStore = connectMongoDBSession(session);
  const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: "sessions",
  });

  store.on("error", (err) => {
    console.error("Session Store Error:", err);
  });

  return store;
};
