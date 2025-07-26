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
export const getEditHouse = async (req, res) => {
  const houseId = req.params.houseId;
  const editing = req.query.editing === "true";

  if (!editing) return res.redirect("/host/host-house-list");

  try {
    const house = await House.findById(houseId);
    if (!house) return res.redirect("/host/host-house-list");

    res.render("host/edit-house", {
      pageTitle: "Edit House",
      currentPage: "host-house",
      editing,
      house,
    });
  } catch (err) {
    console.error("Error loading house for edit:", err.message);
    res.redirect("/host/host-house-list");
  }
};

// GET: All Host's Houses
export const getHostHouses = async (req, res) => {
  try {
    const registeredHouses = await House.find();
    res.render("host/host-house-list", {
      registeredHouses,
      pageTitle: "Host Houses List",
      currentPage: "host-house",
    });
  } catch (err) {
    console.error("Error fetching host houses:", err.message);
    res.redirect("/");
  }
};

// POST: Add New House
export const postAddHouse = async (req, res) => {
  const { name, price, location, rating, photoUrl, description } = req.body;

  try {
    const newHouse = new House({
      name,
      price: Number(price),
      location,
      rating: Number(rating),
      photoUrl,
      description,
    });

    await newHouse.save();
    console.log("House added");
    res.redirect("/host/host-house-list");
  } catch (err) {
    console.error("Error adding house:", err.message);
    res.redirect("/host/host-house-list");
  }
};

// POST: Update Existing House
export const postEditHouse = async (req, res) => {
  const { houseId, name, price, location, rating, photoUrl, description } =
    req.body;

  try {
    await House.findByIdAndUpdate(houseId, {
      name,
      price: Number(price),
      location,
      rating: Number(rating),
      photoUrl,
      description,
    });

    console.log("House updated:", houseId);
    res.redirect("/host/host-house-list");
  } catch (err) {
    console.error("Error updating house:", err.message);
    res.redirect("/host/host-house-list");
  }
};

// POST: Delete House
export const postDeleteHouse = async (req, res) => {
  const houseId = req.params.houseId;

  try {
    await House.findByIdAndDelete(houseId);
    console.log("House deleted:", houseId);
    res.redirect("/host/host-house-list");
  } catch (err) {
    console.error("Error deleting house:", err.message);
    res.redirect("/host/host-house-list");
  }
};
