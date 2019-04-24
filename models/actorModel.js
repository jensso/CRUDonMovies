const mongoose = require('mongoose');
const actorSchema = require('../schemas/actorSchema');

const actorModel = mongoose.model('actors', actorSchema);

module.exports = actorModel;
