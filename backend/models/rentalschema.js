const mongoose = require("mongoose")
const joi = require("joi")
const rentalschema = mongoose.model('rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 15,
                required: true
            },
            isgold: {
                type: Boolean,
                required: true
            },
            phone: {
            type: Number,        
            required: true,
            minlength: 10,
            maxlength: 15
        }
    }),
    required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                minlength: 0,
                maxlength: 255
            }     
        }),
        required: true
    },
    dateout: {
        type: Date,
        required: true
    },
    datereturned: {
        type: Date
    },
    rentalfee: {
        type: Number,
        min: 0
    }
}))
    const schema = joi.object({
        customerId: joi.string().hex().length(24).required(),
        movieId: joi.string().hex().length(24).required()
    })
    module.exports = {
        rentalschema, schema
    }