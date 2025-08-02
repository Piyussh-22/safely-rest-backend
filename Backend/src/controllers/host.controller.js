import { House } from "../models/house.js";

// GET: All Houses for Host
export const getHostHouses = async (req, res) => {
  try {
    const registeredHouses = await House.find();
    return res.json({
      success: true,
      data: registeredHouses,
    });
  } catch (err) {
    console.error("Error fetching host houses:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch houses",
    });
  }
};

// POST: Add New House
export const postAddHouse = async (req, res) => {
  const { name, price, location, photoUrl, description } = req.body;

  // Basic validation for missing fields
  if (!name || !price || !location || !photoUrl || !description) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const newHouse = new House({
      name,
      price: Number(price),
      location,
      photoUrl,
      description,
    });

    await newHouse.save();
    return res.status(201).json({
      success: true,
      message: "House added successfully",
      data: newHouse,
    });
  } catch (err) {
    console.error("Error adding house:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add house",
    });
  }
};

// PUT: Update Existing House
export const updateHouse = async (req, res) => {
  const { houseId } = req.params;
  const { name, price, location, photoUrl, description } = req.body;

  try {
    const updatedHouse = await House.findByIdAndUpdate(
      houseId,
      { name, price: Number(price), location, photoUrl, description },
      { new: true }
    );

    if (!updatedHouse) {
      return res.status(404).json({
        success: false,
        message: "House not found",
      });
    }

    return res.json({
      success: true,
      message: "House updated successfully",
      data: updatedHouse,
    });
  } catch (err) {
    console.error("Error updating house:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to update house",
    });
  }
};

// DELETE: Remove House
export const deleteHouse = async (req, res) => {
  const { houseId } = req.params;

  try {
    const deletedHouse = await House.findByIdAndDelete(houseId);

    if (!deletedHouse) {
      return res.status(404).json({
        success: false,
        message: "House not found",
      });
    }

    return res.json({
      success: true,
      message: "House deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting house:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete house",
    });
  }
};
