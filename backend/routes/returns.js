const mongoose = require("mongoose")
const {schema} = require("../models/rentalschema")
const express = require("express")
const router = express.Router()
const returnschema = mongoose.model('returns', new mongoose.Schema({
    customer: {
        type: string, 
        length: 24
    },
    movie: {
        type: string,
        length: 24
    }
}))
const schema = joi.object({
    customerId: joi.string().hex().length(24).required(),
    movieId: joi.string().hex().length(24).required()
})
router.post('/', async(req, res)=>{
    const {error} = schema.validate(req.body)
    if(error) return res.status(404).send("invalid customer or movie ID")


})
module.exports = router;