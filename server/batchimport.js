
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const trainersData = require("./data/Kaizo Trainer Data.json");
const encountersData = require("./data/Kaizo Encounters Data.json")

const batchImport = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    console.log("connected!");
    const db = client.db("kaizo");
    const response = await db.collection("trainers").insertMany(trainersData);
    const response2 = await db.collection("encounters").insertMany(encountersData);
    console.log(1, response);
    console.log(2, response2);

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