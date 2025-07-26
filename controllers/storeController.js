// external
import { Favourite } from "../models/favourite.js";
import { House } from "../models/house.js";

// Landing Page
export const getIndex = (req, res) => {
  House.fetchAll()
    .then((registeredHouses) => {
      res.render("store/index", {
        registeredHouses,
        pageTitle: "Safely Rest House",
        currentPage: "index",
      });
    })
    .catch((err) => {
      console.error("Error loading index:", err.message);
      res.redirect("/");
    });
};

// House List Page
export const getHouses = async (req, res) => {
  try {
    const allHouses = await House.fetchAll();
    const favDocs = await Favourite.getFavouriteHouseIds();
    const favIds = favDocs.map((f) => String(f.houseId));

    const registeredHouses = allHouses.map((house) => ({
      ...house,
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
export const getHouseDetails = (req, res) => {
  const houseId = req.params.houseId;

  House.findById(houseId)
    .then((house) => {
      if (!house) {
        return res.redirect("/house-list");
      }

      res.render("store/house-detail", {
        house,
        pageTitle: "House Detail",
        currentPage: "house-list",
      });
    })
    .catch((err) => {
      console.error("Error loading house detail:", err.message);
      res.redirect("/house-list");
    });
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
    const favDocs = await Favourite.getFavouriteHouseIds();
    const favIds = favDocs.map((f) => String(f.houseId));

    const allHouses = await House.fetchAll();

    const favouriteHouses = allHouses
      .filter((house) => favIds.includes(String(house._id)))
      .map((house) => ({ ...house, isFav: true }));

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
    const fav = new Favourite(houseId);
    await fav.addOrRemoveFav();
    res.redirect("/favourite-list");
  } catch (err) {
    console.error("Error toggling favourite:", err.message);
    res.redirect("back");
  }
};

// Remove from Favourites (Direct Delete)
export const postRemoveFavourite = (req, res) => {
  const houseId = req.params.houseId;

  Favourite.removeFavById(houseId)
    .then(() => {
      res.redirect("/favourite-list");
    })
    .catch((err) => {
      console.error("Error removing from favourites:", err.message);
      res.redirect("back");
    });
};
