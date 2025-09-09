import { Favourite } from "../models/favourite.js";
import { House } from "../models/house.js";

//  GET: All Houses
export const getHouses = async (req, res) => {
  try {
    const houses = await House.find();
    return res.json({
      success: true,
      data: houses,
    });
  } catch (err) {
    console.error("Error fetching houses:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch houses",
    });
  }
};

//  GET: House Details
export const getHouseDetails = async (req, res) => {
  const { houseId } = req.params;
  try {
    const house = await House.findById(houseId);
    if (!house) {
      return res.status(404).json({
        success: false,
        message: "House not found",
      });
    }
    return res.json({
      success: true,
      data: house,
    });
  } catch (err) {
    console.error("Error fetching house details:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch house details",
    });
  }
};

//  GET: Favourite Houses
export const getFavouriteList = async (req, res) => {
  try {
    const favourites = await Favourite.find({ userId: req.user._id }).populate(
      "houseId"
    );
    const favouriteHouses = favourites.map((fav) => ({
      ...fav.houseId.toObject(),
      isFav: true,
    }));

    return res.json({
      success: true,
      data: favouriteHouses,
    });
  } catch (err) {
    console.error("Error fetching favourites:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch favourites",
    });
  }
};

// POST: Add or Remove Favourite (Toggle)
export const toggleFavourite = async (req, res) => {
  const { houseId } = req.body;

  if (!houseId) {
    return res.status(400).json({
      success: false,
      message: "House ID is required",
    });
  }

  try {
    const existing = await Favourite.findOne({ houseId, userId: req.user._id });
    if (existing) {
      await Favourite.findOneAndDelete({ houseId, userId: req.user._id });
      return res.json({
        success: true,
        message: "Removed from favourites",
      });
    } else {
      await Favourite.create({ houseId, userId: req.user._id });
      return res.json({
        success: true,
        message: "Added to favourites",
      });
    }
  } catch (err) {
    console.error("Error toggling favourite:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to toggle favourite",
    });
  }
};

// ✅ DELETE: Remove Favourite
export const deleteFavourite = async (req, res) => {
  const { houseId } = req.params;

  try {
    await Favourite.findOneAndDelete({ houseId, userId: req.user._id });
    return res.json({
      success: true,
      message: "Favourite removed successfully",
    });
  } catch (err) {
    console.error("Error removing favourite:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to remove favourite",
    });
  }
};
