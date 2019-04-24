const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {type: String,required:true},
  productionYear: {type: Number,required:true},
  imdb_ratio: {type: Number,required:true},
  director: {type: String,required:true}
},{versionKey: false})

  module.exports = movieSchema;
