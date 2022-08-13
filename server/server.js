const express = require('express');
const morgan = require('morgan');

const PORT = 8000;

const {
  getAllroutes,
  getRouteDetails,
} = require("./handlers/routeHandler")

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


  .listen(PORT, () => console.info(`Listening on port ${PORT}`));