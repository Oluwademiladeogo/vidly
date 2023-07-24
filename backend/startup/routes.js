const express = require('express');
const helmet = require("helmet")
const genres = require('../routes/genres')
const customers = require('../routes/customers')
const movies = require('../routes/movies')
const users = require('../routes/users')
const auth = require('../routes/auth')
const error = require('../routes/middleware/error.js')


module.exports = function(app){
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use(helmet());
//if none of them works out, error occurs
app.use(error);
}