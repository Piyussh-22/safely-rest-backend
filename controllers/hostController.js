import { Home } from "../models/home.js";

export const getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "add home",
    currentPage: "addHome",
    editing: false,
  });
};

export const getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("home not found");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      pageTitle: "Edit Home",
      currentPage: "host-home",
      editing: editing,
      home: home,
    });
  });
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
  res.redirect("/host/home-home-list");
};

export const postEditHome = (req, res) => {
  const { id, houseName, housePrice, houseRating, houseLocation, houseURL } =
    req.body;
  const home = new Home(
    houseName,
    housePrice,
    houseRating,
    houseLocation,
    houseURL
  );
  home.id = id;
  home.save();
  res.redirect("/host/host-home-list");
};
