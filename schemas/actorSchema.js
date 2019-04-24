const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
  firstName: {type:String},
  lastName: {type:String},
  moviesPlayed: {type:[]}
})

module.exports = actorSchema;
