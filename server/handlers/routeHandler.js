const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { routeNames } = require("./helpers")

//returns a list of routes
const getAllroutes = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();
    console.log("connected!");
    // connect to the database 
    const db = client.db("kaizo");
    const response = await db.collection("encounters").find().toArray();
    // console.log(response)

    //sort through data for route names
    const routes = routeNames(response);
    // console.log(routes)

    if (routes.length > 0) {
      return res.status(200).json({ status: 200, data: routes })
    }
    else {
      return res.status(404).json({ status: 404, message: "No Routes Found" })
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
  getAllroutes,
}