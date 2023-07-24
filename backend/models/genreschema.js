const mongoose = require("mongoose");
const joi = require("joi")
const genreschema = mongoose.model('genres', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15
    }
}))
const schema = joi.object({
    name : joi.string().min(5).max(15).required()
})
module.exports = {
    genreschema, schema
}