import { Favourite } from "../models/favourite.js";
import { House } from "../models/house.js";

// GET: All houses
export const getHouses = async (req, res) => {
  try {
    const houses = await House.find();
    res.json({ success: true, data: houses });
  } catch (err) {
    console.error("Error fetching houses:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch houses" });
  }
};

// GET: House details by ID
export const getHouseDetails = async (req, res) => {
  const { houseId } = req.params;
  try {
    const house = await House.findById(houseId);
    if (!house)
      return res
        .status(404)
        .json({ success: false, message: "House not found" });
    res.json({ success: true, data: house });
  } catch (err) {
    console.error("Error fetching house details:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch house details" });
  }
};

// GET: Favourite houses for logged-in user
export const getFavouriteList = async (req, res) => {
  try {
    const favourites = await Favourite.find({ userId: req.user._id }).populate(
      "houseId"
    );
    const favouriteHouses = favourites.map((fav) => ({
      ...fav.houseId.toObject(),
      isFav: true,
    }));
    res.json({ success: true, data: favouriteHouses });
  } catch (err) {
    console.error("Error fetching favourites:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch favourites" });
  }
};

// POST: Toggle favourite (add/remove)
export const toggleFavourite = async (req, res) => {
  const { houseId } = req.body;
  if (!houseId)
    return res
      .status(400)
      .json({ success: false, message: "House ID is required" });

  try {
    const existing = await Favourite.findOne({ houseId, userId: req.user._id });
    if (existing) {
      await Favourite.findOneAndDelete({ houseId, userId: req.user._id });
      res.json({ success: true, message: "Removed from favourites" });
    } else {
      await Favourite.create({ houseId, userId: req.user._id });
      res.json({ success: true, message: "Added to favourites" });
    }
  } catch (err) {
    console.error("Error toggling favourite:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to toggle favourite" });
  }
};
