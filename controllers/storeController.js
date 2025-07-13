import { Home } from "../models/home.js";

export const getIndex = (req, res) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "Safely Rest Home",
      currentPage: "index",
    })
  );
};

export const getHomes = (req, res) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
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
  Home.fetchAll((registeredHomes) => {
    res.render("store/favourite-list", {
      registeredHomes: registeredHomes,
      pageTitle: "My Favourite Homes",
      currentPage: "favourite-list",
    });
  });
};

export const getHomeDetails = (req, res) => {
  const homeId = req.params.homeId;
  console.log(homeId);
  res.render("store/home-detail", {
    pageTitle: "Home Detail",
    currentPage: "home-list",
  });
};
