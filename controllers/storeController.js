// local module
import { Favourite } from "../models/favourite.js";
import { House } from "../models/house.js";

// Landing Page
export const getIndex = async (req, res) => {
  try {
    const registeredHouses = await House.find();
    res.render("store/index", {
      registeredHouses,
      pageTitle: "Safely Rest House",
      currentPage: "index",
    });
  } catch (err) {
    console.error("Error loading index:", err.message);
    res.redirect("/");
  }
};

// House List Page
export const getHouses = async (req, res) => {
  try {
    const allHouses = await House.find();
    const favDocs = await Favourite.find();
    const favIds = favDocs.map((f) => String(f.houseId));

    const registeredHouses = allHouses.map((house) => ({
      ...house.toObject(),
      // convert from Mongoose Document to plain object
      isFav: favIds.includes(String(house._id)),
    }));

    res.render("store/house-list", {
      registeredHouses,
      pageTitle: "Houses List",
      currentPage: "house-list",
    });
  } catch (err) {
    console.error("Error loading houses:", err.message);
    res.redirect("/");
  }
};

// House Detail Page
export const getHouseDetails = async (req, res) => {
  const houseId = req.params.houseId;

  try {
    const house = await House.findById(houseId);
    if (!house) return res.redirect("/house-list");

    res.render("store/house-detail", {
      house,
      pageTitle: "House Detail",
      currentPage: "house-list",
    });
  } catch (err) {
    console.error("Error loading house detail:", err.message);
    res.redirect("/house-list");
  }
};

// My Bookings Page (Placeholder)
export const getBookings = (req, res) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

// Favourite List Page
export const getFavouriteList = async (req, res) => {
  try {
    const favourites = await Favourite.find().populate("houseId");
    const favouriteHouses = favourites.map((fav) => ({
      ...fav.houseId.toObject(),
      isFav: true,
    }));

    res.render("store/favourite-list", {
      favouriteHouses,
      pageTitle: "My Favourite Houses",
      currentPage: "favourite-list",
    });
  } catch (err) {
    console.error("Error loading favourites:", err.message);
    res.redirect("/");
  }
};

// Add or Remove from Favourites (Toggle)
export const postAddToFavourites = async (req, res) => {
  const houseId = req.body.houseId;

  try {
    const existing = await Favourite.findOne({ houseId });
    if (existing) {
      await Favourite.findOneAndDelete({ houseId });
    } else {
      await Favourite.create({ houseId });
    }

    res.redirect("/favourite-list");
  } catch (err) {
    console.error("Error toggling favourite:", err.message);
    res.redirect("back");
  }
};

// Remove from Favourites (Direct Delete)
export const postRemoveFavourite = async (req, res) => {
  const houseId = req.params.houseId;

  try {
    await Favourite.findOneAndDelete({ houseId });
    res.redirect("/favourite-list");
  } catch (err) {
    console.error("Error removing from favourites:", err.message);
    res.redirect("back");
  }
};
