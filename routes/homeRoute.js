const express = require('express');

const homeRoute = express.Router();

// Create a / home route that serves a static response inside a json response.
// Give the proper statuses back.
const home = async (req, res, next)=> {
  try {
    res.status(200).json("THIS IS HOME...not Sparta");
  }
  catch (err) {
    next(err);
  }
}
homeRoute.get('/', home)

module.exports = homeRoute;
