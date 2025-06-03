const {Router} = require('express');

const userRouter = Router();

userRouter.post('/signup', function(req, res){
    return res.json({
        msg: 'user signup'
    })
})


userRouter.post('/signin', function(req, res){
    return res.json({
        msg: 'user signin'
    })
})


userRouter.get('/purchased', function(req, res){
    return res.json({
        msg: 'user signup'
    })
})

module.exports = {
    userRouter:userRouter
}