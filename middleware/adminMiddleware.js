const jwt = require('jsonwebtoken')
const {JWT_SECRET_ADMIN} = require('../config')


function adminMiddleware(req, res, next){
    const token = req.headers.token;

    const isTokenVerify = jwt.verify(token, JWT_SECRET_ADMIN);

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
    adminMiddleware
}