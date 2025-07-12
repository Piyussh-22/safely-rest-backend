import { Home } from "../models/home.js";

export const getHomes = (req, res) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Safely Rest Home",
      currentPage: "home-list",
    })
  );
};

export const getBookings = (req, res) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

export const getFavouriteList = (req, res) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/favourite-list", {
      registeredHomes: registeredHomes,
      pageTitle: "My Favourite Homes",
      currentPage: "favourite-list",
    })
  );
};
