const mongoose = require('mongoose');
const movieSchema = require('../schemas/movieSchema');

const movieModel = mongoose.model('movies', movieSchema);

module.exports = movieModel;
