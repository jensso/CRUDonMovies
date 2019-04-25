const express = require('express');
const movieModel = require('../models/movieModel');
const moviesRoute = express.Router();

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
    let sortedByRatio = await movieModel.find( {}  ,{name:1,imdb_ratio:1,_id:0})
    .sort({imdb_ratio: -1}).limit(parseInt(req.params.num));
    sortedByRatio ? res.status(200).json(sortedByRatio) : next(err);
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
// Create a route to give back only the names of the movies,
//  who have been produced between two given years.
// These years should be passed as parameters both.
const getMoviesBetw = async (req, res, next)=> {
  try {
    let moviesBetw = await movieModel.find( {productionYear: {$gt:req.params.min, $lt:req.params.max}
                                    } , {productionYear:1, name:1, _id:0} );
                                    console.log(req.params.min);
                                    console.log(req.params.max);
      moviesBetw ? res.status(200).json(moviesBetw) : next(err);

  }
  catch (err) {
    next(err);
  }
}
// Create an aggregation route that returns all movies with the associated actors who play in
// these movies by creating a referrence between these two models exactly as you did last time.
const getActorsInMovies = async (req, res, next)=> {
  try {
    let actorsInMovies = await movieModel.aggregate([
      {$lookup: {
        from: "actors",
        localField: "name",
        foreignField: "moviesPlayed",
        as: "actsIn",
      } }
    ])
    res.status(200).json(actorsInMovies);
  }
  catch (err) {
    next(err);
  }
}
moviesRoute.get('/', getAllMovies)
moviesRoute.get('/:director', getMoviesFromDir)
moviesRoute.get('/ratio/:num', getByRatio)
moviesRoute.post('/', postNewMovie)
moviesRoute.get('/between/:min/:max', getMoviesBetw)
moviesRoute.get('/aggregate/withActor', getActorsInMovies)


module.exports = moviesRoute;
