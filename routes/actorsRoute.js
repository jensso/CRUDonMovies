const express = require('express');
const actorModel = require('../models/actorModel');
const actorsRoute = express.Router();

// Delete an actor by it's lastName. Create a corresponding Route for that.
const delActor = async (req, res, next)=> {
  try {
  let actorToDel = await actorModel.findOneAndDelete({lastName: req.params.name});
  actorToDel ? res.status(205).send(`${req.params.name} was deleted`)
             : res.status(405).send(`${req.params.name} does not exist`);
           }
  catch (err) {
    next(err);
  }
}
actorsRoute.delete('/actors/:name', delActor)

module.exports = actorsRoute;
