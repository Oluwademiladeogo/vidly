const winston = require("winston")
module.exports = function(err, req, res, next){
    winston.error(err.message, err)
    //log the exception
    res.status(500).send('something happened')
    console.log(err)
}
//logging level derermines the importance of the message we're logging