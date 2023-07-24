const mongoose = require('mongoose')
const express = require("express")
const router = express.Router()
const joi = require("joi")
const {customerschema, schema} = require("../models/customerschema")
router.get('/', async(req, res)=>{
    const result = await customerschema.find().sort('name')
    res.send(result);
})
router.put('/:id', async(req, res)=>{
    const { error } = schema.validate(req.body.name)
    if(error) return res.status(400).send('error')

    const putcustomer = await customerschema.findByIdAndUpdate({
        id: req.params.id,
        name: req.body.name,
        isgold: req.body.isgold,
        phone: req.body.phone,
        new: true

    })
    if(!putcustomer) return res.status(400).send('Customer not found')
    res.send(putcustomer)
})
router.post('/', async(req, res) =>{
    const { error } = schema.validate({
        name : req.body.name,
        phone : req.body.phone,
        isgold : req.body.isgold

    })
    if(error) return res.status(400).send(error);
    const Customer = new customerschema({
        name: req.body.name,
        isgold: req.body.isgold,
        phone: req.body.phone
    })
    
    const result = await Customer.save()
    res.send(result);
})
router.delete("/:id", async(req, res)=>{
    //find, case of error
const delcustomer = await customerschema.findByIdAndDelete(req.params.id)   
if(!delcustomer) return res.status(404).send("Error, customer not found")

    res.send(delcustomer)
    
})
router.get('/:id', async(req, res)=>{
    const result = await customerschema.findById(req.params.id)
    res.send(result);
})
module.exports = router;