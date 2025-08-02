import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    userType: { type: String, enum: ["guest", "host"], required: true },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
