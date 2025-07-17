import { ObjectId } from "mongodb";
import { getDB } from "../utils/databaseUtil.js";

export class House {
  constructor(name, price, location, rating, photoURL, description) {
    this.name = name;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoURL = photoURL;
    this.description = description;
  }

  save() {
    const db = getDB();
    return db.collection("houses").insertOne(this);
  }

  static update(houseID, updatedData) {
    const db = getDB();
    return db
      .collection("houses")
      .updateOne({ _id: new ObjectId(houseID) }, { $set: updatedData });
  }

  static fetchAll() {
    const db = getDB();
    return db.collection("houses").find().toArray();
  }

  static findById(houseID) {
    const db = getDB();
    return db.collection("houses").findOne({ _id: new ObjectId(houseID) });
  }
}
