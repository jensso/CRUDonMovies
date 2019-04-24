const mongoose = require('mongoose');
const movieDB = 'mongodb://localhost/imdb';
const connectToDB = async ()=> {
  try {
    await mongoose.connect(movieDB, {useNewUrlParser:true});
    console.log('DB connected');
  }
  catch (err) {
    console.log(err);
  }
}
module.exports = connectToDB;
