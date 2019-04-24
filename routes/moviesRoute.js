const express = require('express');
const movieModel = require('../models/movieModel');
const moviesRoute = express.Router();

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
// Create a /movies router for handling a Get Request there,
// when done give all the available movies back inside a json.
const getAllMovies = async (req, res, next)=> {
  try {
    let allMovies = await movieModel.find();
    res.status(200).json(allMovies);
    }
    catch (err) {
      next(err);
    }
}
// Create a route that accepts and listens to a Get request, parses a request
// parameter that holds the director and returns
// in a json all the movies from this matched director. Return only the movie's name.
const getMoviesFromDir = async (req, res, next)=> {
  try {
    let moviesFromDir = await movieModel.find({director:req.params.director},{name:1, _id:0})
    moviesFromDir ? res.status(202).json(moviesFromDir) : next(err);
  }
  catch (err) {
    next(err);
  }
}
// Create a route that listens to a Get request.
// Accepts a number as a request parameter, sorts all movies by imdb_ratio
// and returns only the top results specified by the number of the parameters.
const getByRatio = async (req, res, next)=> {
  try {
    let sortedByRatio = await movieModel.find( {imdb_ratio:{$gt: req.params.num} } )//.sort({imdb_ratio: 1,_id: 0});
    sortedByRatio ? res.status(204).send(sortedByRatio) : next(err);
  }
  catch (err) {
    next(err);
  }
}
// Create a route for creating a
// new movie with all the necessary data from the req.body.
const postNewMovie = async (req, res, next)=> {
  try {
    await movieModel.create(req.body);
    res.status(201).send('a movie was added to the imdb');
  }
  catch (err) {
    next(err);
  }
}
// Create a route for handling updates for every actor
// on any field that is specified in the req.body.
// The actor should be selected by lastName.

moviesRoute.get('/', home)
moviesRoute.get('/movies', getAllMovies)
moviesRoute.get('/movies/:director', getMoviesFromDir)
moviesRoute.get('/movies/:num', getByRatio)
moviesRoute.post('/movies', postNewMovie)

module.exports = moviesRoute;
