const Joi = require('joi');
const mongoose = require('mongoose');
const movieschema = mongoose.model('movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 15
            }
        })
    },
    numberInStock: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255
    }
    
}))
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreid: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    })    

module.exports = {
    movieschema, schema
}