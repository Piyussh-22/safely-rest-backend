import mongoose from "mongoose";

export const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🟢 Connected to MongoDB with Mongoose");
  } catch (err) {
    console.log("🔴 Error while connecting to MongoDB", err.message);
    throw err;
  }
};
