//local modules
import { db } from "../utils/databaseUtil.js";

export class House {
  constructor(
    houseID,
    houseName,
    housePrice,
    houseRating,
    houseLocation,
    housePhotoURL,
    houseDescription
  ) {
    this.houseID = houseID;
    this.houseName = houseName;
    this.houseLocation = houseLocation;
    this.housePrice = housePrice;
    this.houseRating = houseRating;
    this.housePhotoURL = housePhotoURL;
    this.houseDescription = houseDescription;
  }

  save() {
    if (this.houseID) {
      // UPDATE
      return db.execute(
        `UPDATE houses SET
        houseName = ?,
        housePrice = ?,
        houseRating = ?,
        houseLocation = ?,
        housePhotoURL = ?,
        houseDescription = ?
      WHERE houseID = ?`,
        [
          this.houseName,
          this.housePrice,
          this.houseRating,
          this.houseLocation,
          this.housePhotoURL,
          this.houseDescription,
          this.houseID,
        ]
      );
    } else {
      // INSERT
      return db.execute(
        `INSERT INTO houses (
        houseName,
        housePrice,
        houseRating,
        houseLocation,
        housePhotoURL,
        houseDescription
      ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          this.houseName,
          this.housePrice,
          this.houseRating,
          this.houseLocation,
          this.housePhotoURL,
          this.houseDescription,
        ]
      );
    }
  }

  static fetchAll() {
    return db.execute("SELECT * FROM houses");
  }

  static findById(houseID) {
    return db.execute("SELECT * FROM houses WHERE houseID=?", [houseID]);
  }

  static deleteById(houseID) {
    return db.execute("DELETE FROM houses WHERE houseID=?", [houseID]);
  }
}
