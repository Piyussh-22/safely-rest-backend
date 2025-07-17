import { House } from "../models/house.js";

// GET: Add House Form
export const getAddHouse = (req, res) => {
  res.render("host/edit-house", {
    pageTitle: "Add House",
    currentPage: "addHouse",
    editing: false,
    house: null,
  });
};

// GET: Edit House Form
export const getEditHouse = (req, res) => {
  const houseID = req.params.houseID;
  const editing = req.query.editing === "true";

  if (!editing) {
    return res.redirect("/host/host-house-list");
  }

  House.findById(houseID)
    .then((house) => {
      if (!house) {
        return res.redirect("/host/host-house-list");
      }

      res.render("host/edit-house", {
        pageTitle: "Edit House",
        currentPage: "host-house",
        editing,
        house,
      });
    })
    .catch((err) => {
      console.error("Error loading house for edit:", err);
      res.redirect("/host/host-house-list");
    });
};

// GET: All Host's Houses
export const getHostHouses = (req, res) => {
  House.fetchAll()
    .then((registeredHouses) => {
      res.render("host/host-house-list", {
        registeredHouses,
        pageTitle: "Host Houses List",
        currentPage: "host-house",
      });
    })
    .catch((err) => {
      console.error("Error fetching host houses:", err);
      res.redirect("/");
    });
};

// POST: Add New House
export const postAddHouse = (req, res) => {
  const { name, price, rating, location, photoUrl, description } = req.body;

  const house = new House(
    null,
    name,
    price,
    rating,
    location,
    photoUrl,
    description
  );

  house.save().then(() => {
    console.log("home saved done");
  });
};

// POST: Update Existing House
export const postEditHouse = (req, res) => {
  const { houseID, name, price, rating, location, photoUrl, description } =
    req.body;

  const house = new House(
    houseID,
    name,
    price,
    rating,
    location,
    photoUrl,
    description
  );

  house
    .save()
    .then(() => res.redirect("/host/host-house-list"))
    .catch((err) => {
      console.error("Error updating house:", err);
      res.redirect("/host/host-house-list");
    });
};

// POST: Delete House
export const postDeleteHouse = (req, res) => {
  const houseID = req.params.houseID;
  House.deleteById(houseID)
    .then(() => res.redirect("/host/host-house-list"))
    .catch((err) => {
      console.error("Error deleting house:", err);
      res.redirect("/host/host-house-list");
    });
};
