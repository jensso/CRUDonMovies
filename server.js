const express = require('express');
const morgan = require('morgan');
const connectToDB = require('./mongohelper/mongohelper.js');
const port = 2525;

const server = express();
const moviesRoute = require('./routes/moviesRoute.js');
const actorsRoute = require('./routes/actorsRoute.js');
const homeRoute = require('./routes/homeRoute.js');


connectToDB();
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(express.static('public'));
server.use('/movies', moviesRoute);
server.use('/actors', actorsRoute);
server.use('/', homeRoute);

server.listen(port);
console.log(`server is listening on ${port}`);
