const mongoose = require("mongoose")
const joi = require("joi")
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router();
const {userschema, schema} = require("../models/userschema")

router.post('/', async(req, res)=>{
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let user = await userschema.findOne({email: req.body.email})
    if(user) return res.status(400).send("Invalid email or password")

    user = new userschema({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }) 
    const salt = await bcrypt.genSalt(10)
    console.log(salt);
    user.password = await bcrypt.hash('user.password', salt);
   await user.save()

  const validpassword = await bcrypt.compare(req.body.password, user.password)
  if(!validpassword) return  res.status(400).send("Invalid email or password")
  token = userschema.generateAuthToken()
  res.send(token)
})
module.exports = router;

