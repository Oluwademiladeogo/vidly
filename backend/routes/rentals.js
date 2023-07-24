const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const joi = require("joi")
const auth = require("./middleware/auth.js")
const {movieschema} = require("../models/movieschema")
const {customerschema} = require("../models/customerschema")
const {rentalschema, schema} = require("../models/rentalschema")

router.get('/', async(res)=>{
    const rentals = await rentalschema.find().sort('dateout')
    res,send(rentals)
})
router.post('/', auth, async(req, res)=>{
    const { error } = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await customerschema.findById(req.body.customerId)
    if(!customer) return res.status(400).send('Customer not found');

    const movie = await movieschema.findById(req.body.movieId)
    if(!movie) return res.status(400).send('Moive not found')

    if(movie.numberInStock == 0) return res.status(400).send('Movie not in stock')

    let rentals = new rentalschema({
        customer: {
            _id: customer.id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie.id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })
    
    try {
        const session = await mongoose.startSession()
        session.withTransaction(async()=>{
            rentals = await rentals.save();
            movie.numberInStock--;
            movie.save();
            res.send(rentals);
        })
        session.endSession()
        console.log("transaction success");
    }
    
    catch(error) {
        console.log(error.message);
        res.status(500).send('something failed. DIagnosiing...')
    }
   
})
module.exports = router;