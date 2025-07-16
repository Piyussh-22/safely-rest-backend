//core modules
import fs from "fs";
import path from "path";
import rootDir from "../utils/pathUtil.js";

const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

export class Favourite {
  static addToFavourite(houseId, callback) {
    Favourite.getFavourites((favourites) => {
      if (favourites.includes(houseId)) {
        console.log("house is already fav marked");
      } else {
        favourites.push(houseId);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static deleteById(delHouseId, callback) {
    Favourite.getFavourites((houseIds) => {
      houseIds = houseIds.filter((houseId) => houseId !== delHouseId);
      fs.writeFile(favouriteDataPath, JSON.stringify(houseIds), callback);
    });
  }
}
