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
// Create a route for handling updates for every actor
// on any field that is specified in the req.body.
// The actor should be selected by lastName.
const updActor = async (req, res, next)=> {
  try {
  let actorToUpd = await actorModel.findOneAndUpdate({lastName: req.params.name}, req.body,{new:true});
  actorToUpd ? res.status(202).json(actorToUpd)
             : res.status(402).send(`update of ${req.params.name} was NOT successful`);
  }
  catch (err) {
    next(err);
  }
}
// Lastly delete all actors, who have played in a given movie.
// This movie should be passed as a parameter in url.
const delByMovie = async (req, res, next)=> {
  try {

  let actorToDel = await actorModel.findOneAndDelete({ moviesPlayed: {$elemMatch: {$eq: req.params.nameOfMovie}} });
  actorToDel ? res.status(200).send(`${actorToDel.lastName} was deleted`) : res.status(404).send('this movie does not match to the actor')
  }
  catch (err) {
    next(err);
  }
}
actorsRoute.delete('/:name', delActor)
actorsRoute.put('/:name', updActor)
actorsRoute.delete('/moviesPlayed/:nameOfMovie', delByMovie)

module.exports = actorsRoute;
