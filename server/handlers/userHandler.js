const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { userData } = require("../helpers/userConstructer");

//using the email from Auth0 find user 
//create user if not found
const getUser = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  //get email 
  // const email = req.body.email;
  const emailQuery = { email: req.params.email };

  try {
    // connect to the client
    await client.connect();
    console.log("connected!");
    // connect to the database 
    const db = client.db("kaizo");

    //find user data
    const response = await db.collection("users").find(emailQuery).toArray();
    console.log(response)

    // check if user exists
    if (response.length > 0) {
      return res.status(200).json({ status: 200, data: response[0] })
    }
    else {
      //create new user
      const newUser = new userData(req.params.email);

      //empty email means not logged in
      //only insert user into DB when email is available
      if (req.params.email !== "1234567890987654321") {
        const response2 = await db.collection("users").insertOne(newUser);
        console.log(response2)
        if (response2?.insertedId) {
          return res.status(200).json({ status: 200, data: newUser })
        }
        else {
          return res.status(404).json({ status: 404, message: "error" })
        }
      }
      else {
        return res.status(200).json({ status: 200, data: newUser })
      }


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

module.exports = { getUser };