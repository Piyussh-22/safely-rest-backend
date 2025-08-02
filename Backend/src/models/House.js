import mongoose from "mongoose";
import { Favourite } from "./favourite.js";

const houseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: (val) => !isNaN(val),
        message: "Price must be a valid number",
      },
    },
    location: { type: String, required: true, trim: true },
    rating: {
      type: Number,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating must be at most 5"],
      default: 0,
    },
    photoUrl: {
      type: String,
      required: true,
      validate: {
        validator: (val) => /^https?:\/\/.+/.test(val),
        message: "Photo URL must be valid",
      },
    },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Cascade delete favourites when a house is deleted
houseSchema.pre("findOneAndDelete", async function (next) {
  const houseId = this.getQuery()._id;
  await Favourite.deleteMany({ houseId });
  next();
});

houseSchema.index({ location: 1 });
houseSchema.index({ price: 1 });

export const House = mongoose.model("House", houseSchema);
