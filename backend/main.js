const express = require('express');
const app = express();  
const winston = require("winston")
const log = require("./startup/logging");
const config = require("./startup/config");
const routes = require("./startup/routes");
const db = require("./startup/db");
log(); config; routes(app); db;
port = process.env.PORT || 3000
const server = app.listen(port, ()=>{winston.info(`server running on port ${port}`)});
module.exports = server



















//steps:
//connect to mngoose and require all necessary dependencies
//use...as {api endpoints}; 
//mongoose schema creation for find, update and delete
//joi schema for parameters and body
// build regular api with async endpoints (using router) to handle basic requests
//validate with joi for initial errors with database
//mongoose validation and error checking

//authentication: validating users
//authorization: checking which users have which permissions