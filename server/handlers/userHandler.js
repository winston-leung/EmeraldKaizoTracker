const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//using the email from Auth0 find user 

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
    // console.log(response)

    // check if user exists
    if (response.length > 0) {
      return res.status(200).json({ status: 200, data: response[0] })
    }
    else {
      return res.status(307).json({ status: 307, message: "User not Found" })
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

//create new user 
const postUser = async (req, res) => {
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
    // console.log(response)

    //check if no user is found
    if (response.length === 0) {

      //empty email means not logged in
      //only insert user into DB when email is available
      if (req.params.email !== "1234567890987654321") {
        const response2 = await db.collection("users").insertOne(req.body);
        // console.log(response2)
        //check if data is inserted
        if (response2?.insertedId) {
          return res.status(201).json({ status: 201, data: req.body })
        }
        else {
          return res.status(404).json({ status: 404, message: "error" })
        }
      }
      else {
        return res.status(200).json({ status: 200, message: "general user" })
      }
    }
    else {
      return res.status(404).json({ status: 404, message: "email already used" })
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

module.exports = { getUser, postUser };