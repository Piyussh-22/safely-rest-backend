import { MongoClient } from "mongodb";

let _DB;

const mongoConnect = (callback) => {
  MongoClient.connect(URL)
    .then((client) => {
      console.log("🟢 Connected to MongoDB");
      _DB = client.db("safely_rest");
      callback();
    })
    .catch((err) => {
      console.log("🔴 Error while connecting to MongoDB", err);
      throw err;
    });
};

const getDB = () => {
  if (!_DB) {
    throw new Error("DB not connected");
  }
  return _DB;
};

export { mongoConnect, getDB };
