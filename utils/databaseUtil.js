import { MongoClient } from "mongodb";

const URL = process.env.MONGODB_URI;

let db; // holds the connected DB instance

// Connect to MongoDB (called in app.js)
const mongoConnect = async () => {
  try {
    const client = await MongoClient.connect(URL);
    console.log("🟢 Connected to MongoDB");
    db = client.db("safely_rest");
  } catch (err) {
    console.log("🔴 Error while connecting to MongoDB", err);
    throw err;
  }
};

// Get the connected DB instance
const getDB = () => {
  if (!db) {
    throw new Error("Database not connected");
  }
  return db;
};

export { mongoConnect, getDB };
