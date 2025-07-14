//core modules
import fs from "fs";
import path from "path";
import rootDir from "../utils/pathUtil.js";

const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

export class Favourite {
  static addToFavourite(homeId, callback) {
    Favourite.getFavourites((favourites) => {
      if (favourites.includes(homeId)) {
        console.log("home is alrady fav marked");
      } else {
        favourites.push(homeId);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
}
