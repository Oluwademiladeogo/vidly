const mongoose = require('mongoose')
const winston = require('winston')
mongoose.connect('mongodb://127.0.0.1:27017/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology: true}) 
    .then(()=> console.log('connected'))
    .then(()=> winston.info("connected to mongodb"))