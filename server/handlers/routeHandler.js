const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

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
    const response = await db.collection("progression").find().toArray();
    // console.log(response)

    //filter through data for route names
    const routes = [];
    const imageSrc = []
    response.forEach((route) => {
      routes.push(route.route)
      if (route?.imageSrc) {
        imageSrc.push(route.imageSrc)
      }
      else {
        imageSrc.push(null)
      }
    })
    // console.log(routes)

    if (routes.length > 0) {
      return res.status(200).json({ status: 200, data: routes, src: imageSrc })
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

//get a route details 
const getRouteDetails = async (req, res) => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  //get route name
  const routeName = req.params.route;
  // console.log(routeName)

  const routeQuery = { _id: routeName };
  const trainerQuery = { Route: routeName };
  // console.log(routeQuery, trainerQuery)
  try {
    // connect to the client
    await client.connect();
    console.log("connected!");
    // connect to the database 
    const db = client.db("kaizo");

    //find route encounters
    const response = await db.collection("encounters").find(routeQuery).toArray();
    // console.log(response)

    // find all trainers with route
    const response2 = await db.collection("trainers").find(trainerQuery).toArray();
    // console.log(response2)

    //check response has any data
    //no need for response2 as there could be no trainer data in route

    return res.status(200).json({ status: 200, encounters: response, trainers: response2 })
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
  getRouteDetails,
}