import { Home } from "../models/home.js";

export const getAddHome = (req, res, next) => {
  res.render("host/addHome", { pageTitle: "add home", currentPage: "addHome" });
};

export const getHostHomes = (req, res) => {
  Home.fetchAll((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-home",
    })
  );
};

export const postAddHome = (req, res) => {
  const { houseName, housePrice, houseRating, houseLocation, houseURL } =
    req.body;
  const home = new Home(
    houseName,
    housePrice,
    houseRating,
    houseLocation,
    houseURL
  );
  home.save();
  res.render("host/home-added", {
    pageTitle: "Home added Done",
    currentPage: " addHomeDone",
  });
};
