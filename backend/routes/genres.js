const express = require("express")
const mongoose = require('mongoose')
const joi = require("joi")
const validateObjectId = require("./middleware/validateObjectid")
const auth = require("C:/Users/USER/Desktop/vidly/backend/routes/middleware/auth.js")
const admin = require("C:/Users/USER/Desktop/vidly/backend/routes/middleware/admin.js")
const router = express.Router()
const { genreschema, schema } = require("../models/genreschema")


async function createGenre(){
    const genre = new genreschema(
{name: 'deletelater'})
    const result = await genre.save()
console.log(result);
}
//  createGenre()

router.get('/', async(req, res)=>{
            // throw new Error("Unhandled error, couldnt get genres")
            const genres = await genreschema.find().sort('name');
            res.send(genres)
})
router.post('/', auth, async(req, res) =>{
    const { error } = schema.validate({name : req.body});
    if(error) return res.status(400).send(error)
    let  Addgenre = new genreschema({name: req.body.name})
    Addgenre = await genreschema.save()
    res.send(Addgenre)
})
router.put('/:id', async(req, res)=>{
       //validate
       
    //case eror
    const { error } = schema.validate({name : req.body})
    if(error) return res.status(400).send(error)

    const putgenre = await genreschema.findByIdAndUpdate(req.params.id, {name: req.body.name, new: true})

    //find the course
    if(!putgenre) return res.status(404).send('error, genre not found')
    res.send(putgenre)

})
router.delete("/:id", [auth, admin], async(req, res)=>{
    //find, case of error
const delgenre = await genreschema.findByIdAndDelete(req.params.id)   
if(!delgenre) return res.status(404).send("Error, genre not found")

    res.send(delgenre)
    
})
router.get('/:id', validateObjectId, async(req, res) => {
    const genre = await genreschema.findById(req.params.id)
    if(!genre) return res.status(404).send("Error, genre not found")
    res.send(genre)
})

module.exports = router;