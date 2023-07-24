const mongoose = require("mongoose")
const joi = require("joi")
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require("./middleware/auth.js")
const { userschema, schema } = require("../models/userschema.js")
const router = express.Router();

router.get('/me', auth, async(req, res)=>{
    const user = await user.findById(req.user._id).select(-password)
})
router.post('/', auth, async(req, res)=>{
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let user = await userschema.findOne({email: req.body.email})
    if(user) return res.status(400).send("User already registered")

    user = 
    new userschema({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }) 
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash('user.password', salt)
    userschema.password = user.password
   await user.save()
token = jwt.sign({password: req.body.password}, config.get("jwtprivatekey"))
res.header('x-auth-token', token).send({
    id: user.id,
    name: user.name,
    email: user.email
})
})
//in postman in the headers tab you should see the x-authtoken

module.exports = router;
