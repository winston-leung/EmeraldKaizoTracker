
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const trainersData = require("./data/Kaizo Trainer Data.json");
const encountersData = require("./data/Kaizo Encounters Data.json")
const progressionData = require("./data/Kaizo Progression Data.json")
const users = require("./data/Users.json")

const batchImport = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connected!");
    const db = client.db("kaizo");
    const response = await db.collection("trainers").insertMany(trainersData);
    console.log(1, response);
    const response2 = await db.collection("encounters").insertMany(encountersData);
    console.log(2, response2);
    const response3 = await db.collection("progression").insertMany(progressionData);
    console.log(3, response3);
    const response4 = await db.collection("users").insertMany(users);
    console.log(4, response4);


  }
  catch (err) {
    console.log(err)
  }
  finally {
    client.close()
    console.log("disconnected!");
  }
}

batchImport()