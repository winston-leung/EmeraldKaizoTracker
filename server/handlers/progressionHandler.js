const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// updates user progression
const patchProgression = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  //get email
  const email = req.params.email;

  const emailQuery = { email: email }
  const newValues = { $set: { progression: req.body.progression } }

  try {
    // connect to the client
    await client.connect();
    console.log("connected!");
    // connect to the database 
    const db = client.db("kaizo");

    //update user progression with new values
    const response = await db.collection("users").updateOne(emailQuery, newValues)
    // console.log(response)

    //check if any data is modified
    if (response.modifiedCount > 0) {
      return res.status(200).json({ status: 200, message: "updated" })
    }
    else {
      return res.status(400).json({ status: 400, message: req.body.changed })
    }

  }
  catch (err) {
    console.log(err)
  }
  finally {
    client.close()
    console.log("disconnected!");
  }
}

module.exports = {
  patchProgression
}