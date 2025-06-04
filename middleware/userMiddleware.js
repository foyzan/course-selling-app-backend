const jwt = require('jsonwebtoken')
const {JWT_SECRET_USER} = require('../config')


function userMiddleware(req, res, next){
    const token = req.headers.token;

    const isTokenVerify = jwt.verify(token, JWT_SECRET_USER);

    if(isTokenVerify){
        req.userId = isTokenVerify.id
        next()
    }else{
        res.status(402).json({
            msg: "user not signin"
        })
    }
}



module.exports = {
    userMiddleware
}