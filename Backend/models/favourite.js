import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema(
  {
    houseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "House",
      unique: true,
    },
    savedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Favourite = mongoose.model("Favourite", favouriteSchema);
