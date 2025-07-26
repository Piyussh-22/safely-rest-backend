import { ObjectId } from "mongodb";
import { getDB } from "../utils/databaseUtil.js";

export class House {
  constructor(name, price, location, rating, photoUrl, description, _id) {
    this.name = name;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  validate() {
    if (!this.name || typeof this.name !== "string") {
      throw new error("Name must be non-empty string");
    }
    if (typeof this.price !== "number" || isNaN(this.price)) {
      throw new Error("Price must be a valid number.");
    }
    if (!this.location || typeof this.location !== "string") {
      throw new Error("Location must be a non-empty string.");
    }
    if (typeof this.rating !== "number" || this.rating < 0 || this.rating > 5) {
      throw new Error("Rating must be a number between 0 and 5.");
    }
    if (!this.photoUrl || typeof this.photoUrl !== "string") {
      throw new Error("Photo URL must be a string.");
    }
    if (!this.description || typeof this.description !== "string") {
      throw new Error("Description must be a string.");
    }
  }

  saveOrUpdate() {
    this.validate();
    const db = getDB();
    if (this._id) {
      //update
      const updateFields = {
        name: this.name,
        price: this.price,
        location: this.location,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description,
      };
      return db
        .collection("houses")
        .updateOne(
          { _id: new ObjectId(String(this._id)) },
          { $set: updateFields }
        );
    } else {
      //new house insert
      return db.collection("houses").insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDB();
    return db.collection("houses").find().toArray();
  }

  static findById(houseId) {
    const db = getDB();
    return db
      .collection("houses")
      .findOne({ _id: new ObjectId(String(houseId)) });
  }

  static deleteById(houseId) {
    const db = getDB();
    return db
      .collection("houses")
      .deleteOne({ _id: new ObjectId(String(houseId)) });
  }
}
