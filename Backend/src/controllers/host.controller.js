// controllers/host.controller.js
import { House } from "../models/house.js";
import cloudinary from "../config/cloudinary.config.js";

// Helper to upload one file to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "houses" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

// GET: all houses of Host
export const getHostHouses = async (req, res) => {
  try {
    const registeredHouses = await House.find({ owner: req.user._id });
    return res.json({ success: true, data: registeredHouses });
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
  try {
    if (!req.files?.length) {
      return res.status(400).json({
        success: false,
        message: "At least 1 photo is required",
      });
    }

    if (req.files.length > 2) {
      return res.status(400).json({
        success: false,
        message: "Maximum 2 photos allowed",
      });
    }

    const { name, price, location, description } = req.body;
    if (!name || !price || !location || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Upload all photos
    const uploadedPhotos = [];
    for (const file of req.files) {
      try {
        const url = await uploadToCloudinary(file.buffer);
        uploadedPhotos.push(url);
      } catch (uploadErr) {
        console.error("Cloudinary upload error:", uploadErr.message);
        return res.status(500).json({
          success: false,
          message: "Photo upload failed",
        });
      }
    }

    const newHouse = await House.create({
      name,
      price: Number(price),
      location,
      description,
      photos: uploadedPhotos,
      owner: req.user._id,
    });

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
  try {
    const { houseId } = req.params;
    const { name, price, location, description } = req.body;

    const updatedHouse = await House.findOneAndUpdate(
      { _id: houseId, owner: req.user._id },
      { name, price: Number(price), location, description },
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
  try {
    const { houseId } = req.params;

    const deletedHouse = await House.findOneAndDelete({
      _id: houseId,
      owner: req.user._id,
    });

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
