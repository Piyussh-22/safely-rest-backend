//core modules
import fs from "fs";
import path from "path";
import rootDir from "../utils/pathUtil.js";
import { json } from "stream/consumers";

export class Home {
  constructor(houseName, housePrice, houseRating, houseLocation, houseURL) {
    this.houseName = houseName;
    this.houseLocation = houseLocation;
    this.housePrice = housePrice;
    this.houseRating = houseRating;
    this.houseURL = houseURL;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      const homeDataPath = path.join(rootDir, "data", "homes.json");
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("file writing done", error);
      });
    });
  }

  static fetchAll(callback) {
    const filePath = path.join(rootDir, "data", "homes.json");
    fs.readFile(filePath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
}
