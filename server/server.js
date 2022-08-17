const express = require('express');
const morgan = require('morgan');

const PORT = 8000;

const {
  getAllroutes,
  getRouteDetails,
} = require("./handlers/routeHandler")

const { getUser, postUser } = require("./handlers/userHandler")

const { patchProgression } = require('./handlers/progressionHandler');

express()
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE, PATCH'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))


  //endpoints

  //Get all routes
  .get("/api/all-routes", getAllroutes)
  .get("/api/route/:route", getRouteDetails)

  //get user data
  .get("/api/user/:email", getUser)

  //update user progression
  .patch("/api/progression/:email", patchProgression)

  //create user
  .post("/api/user/:email", postUser)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));