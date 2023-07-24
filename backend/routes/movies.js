const express = require("express")
const mongoose = require('mongoose')
const router = express.Router()
const joi = require("joi");
const { movieschema, schema } = require('../models/movieschema')
const { genreschema } = require("../models/genreschema")

// async function createMovie(){
//     const movie = new movieschema({
//         title: 'firstmovie',
//         numberInStock: 1
//     })
//     const result = await movie.save()
//     console.log(result)
// }

router.get('/', async(req, res)=>{
    const movies = await movieschema.find().sort('title');
    res.send(movies)
})

router.post('/api/moives', async(req, res)=>{
    const { error } = schema.validate({name: req.body})
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await genreschema.findById(req.body.genreId);
    if(!genre) return res.status(400).send('Invalid genre');

    let postmovie = new movieschema({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    postmovie = await movieschema.save()
    res.send(postmovie)
})
router.put('/api/movies', async(req, res)=>{
    const { error } = schema.validate({name: req.body})
    if (error) return res.status(400),send('invalid name entered');
    const putmovie = await movieschema.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        id: req.body.number,
        new: true
    })
    if(!putmovie) return res.status(404).send('error, movie not found')
    res.send(putmovie)})

    router.delete("/:id", async(req, res)=>{
        //find, case of error
    const delmovie = await genreschema.findByIdAndDelete(req.params.id)   
    if(!delmovie) return res.status(404).send("Error, movie not found")
    res.send(delmovie)
    })
    router.get('/:id', async(req, res) => {
        const movie = await genreschema.findById(req.params.id)
        if(!movie) return res.status(404).send("Error, movie not found")
        res.send(movie)
    })
    
    module.exports = router;