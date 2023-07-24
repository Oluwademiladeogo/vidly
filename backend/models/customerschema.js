const mongoose = require('mongoose')
const joi = require("joi")
const customerschema = mongoose.model('customer', new mongoose.Schema({
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
}))
const schema = joi.object({
    name: joi.string().min(5).max(15).required,
    phone: joi.number().min(5).max(15).required,
    isgold: joi.boolean()
})
module.exports = {
    customerschema, schema
}