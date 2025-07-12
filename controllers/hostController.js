import { Home } from "../models/home.js";

export const getAddHome = (req, res, next) => {
  res.render("host/addHome", { pageTitle: "add home", currentPage: "addHome" });
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
  res.render("host/addHomeDone", {
    pageTitle: "Home added Done",
    currentPage: " addHomeDone",
  });
};
