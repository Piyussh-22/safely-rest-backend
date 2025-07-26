import mongoose from "mongoose";
import { Favourite } from "./favourite.js";

const houseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "House name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      validate: {
        validator: (val) => !isNaN(val),
        message: "Price must be a valid number",
      },
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    rating: {
      type: Number,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating must be at most 5"],
      default: 0,
    },
    photoUrl: {
      type: String,
      required: [true, "Photo URL is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },
  {
    timestamps: true,
  }
);

//Cascade delete: Remove from Favourite when a house is deleted
houseSchema.pre("findOneAndDelete", async function (next) {
  const houseId = this.getQuery()._id;
  await Favourite.deleteMany({ houseId });
  next();
});

export const House = mongoose.model("House", houseSchema);
