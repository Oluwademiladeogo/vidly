const mongoose = require("mongoose")
const joi = require("joi")
const users =  new mongoose.Schema({
    name : {
        type : String,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        minlength: 5,
        maxlength: 255,
        required : true
    },
    password : { 
        type : String,
        minlength: 5,
        maxlength: 1024,
        required : true 

    },
    isAdmin : {
        type : Boolean
    }
})
users.methods.generateAuthToken = function(){
    token = jwt.sign({_id : this._id, isAdmin: this.isAdmin}, config.get("jwtprivatekey"))
    return token;
}
userschema = mongoose.model("user", users)
const schema = joi.object({
    name: joi.string().min(5).max(25).required(),
    email: joi.string().min(5).max(25).email().required(),
    password: joi.string().min(5).max(255).required()
})
module.exports = {
    userschema, schema
}