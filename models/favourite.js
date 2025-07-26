import { ObjectId } from "mongodb";
import { getDB } from "../utils/databaseUtil.js";

export class Favourite {
  constructor(houseId) {
    this.houseId = houseId;
  }

  validate() {
    if (!this.houseId || typeof this.houseId !== "string") {
      throw new Error("houseId must be a non-empty string.");
    }
  }

  async addOrRemoveFav() {
    this.validate();
    const db = getDB();
    const houseId = String(this.houseId);
    const existingFav = await db.collection("favourites").findOne({ houseId });

    if (existingFav) {
      return db.collection("favourites").deleteOne({ houseId });
    } else {
      return db.collection("favourites").insertOne({ houseId });
    }
  }

  static getFavourites() {
    const db = getDB();
    return db.collection("favourites").find().toArray();
  }

  static removeFavById(houseId) {
    const db = getDB();
    return db.collection("favourites").deleteOne({ houseId: String(houseId) });
  }

  static getFavouriteHouseIds() {
    const db = getDB();
    return db
      .collection("favourites")
      .find({}, { projection: { houseId: 1, _id: 0 } })
      .toArray();
  }
}
