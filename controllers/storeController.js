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
      console.error("Error loading index:", err);
      res.redirect("/");
    });
};

// House List Page
export const getHouses = (req, res) => {
  House.fetchAll()
    .then((registeredHouses) => {
      console.log(registeredHouses);
      res.render("store/house-list", {
        registeredHouses,
        pageTitle: "Houses List",
        currentPage: "house-list",
      });
    })
    .catch((err) => {
      console.error("Error loading houses:", err);
      res.redirect("/");
    });
};

// House Detail Page
export const getHouseDetails = (req, res) => {
  const houseID = req.params.houseID;

  House.findById(houseID)
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
      console.error("Error loading house detail:", err);
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
export const getFavouriteList = (req, res) => {
  Favourite.getFavourites((favourites) => {
    House.fetchAll()
      .then((registeredHouses) => {
        const favouriteHouses = registeredHouses.filter((house) =>
          favourites.includes(house.houseID)
        );

        res.render("store/favourite-list", {
          favouriteHouses,
          pageTitle: "My Favourite Houses",
          currentPage: "favourite-list",
        });
      })
      .catch((err) => {
        console.error("Error loading favourites:", err);
        res.redirect("/");
      });
  });
};

// Add to Favourites
export const postAddToFavourites = (req, res) => {
  const houseID = req.body.id;

  Favourite.addToFavourite(houseID, (error) => {
    if (error) {
      console.error("Error adding to favourites:", error);
    }
    res.redirect("/favourite-list");
  });
};

// Remove from Favourites
export const postRemoveFavourite = (req, res) => {
  const houseId = req.params.houseId;

  Favourite.deleteById(houseId, (error) => {
    if (error) {
      console.error("Error removing from favourites:", error);
    }
    res.redirect("/favourite-list");
  });
};
