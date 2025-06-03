const {Router} = require('express')

const adminRouter = Router();


adminRouter.post('/signup', function(req, res){
    return res.json({
        msg: 'user signup'
    })
})


adminRouter.post('/signin', function(req, res){
    return res.json({
        msg: 'user signin'
    })
})

adminRouter.post('/course', function(req, res){
    return res.json({
        msg: 'user signin'
    })
})
adminRouter.put('/course', function(req, res){
    return res.json({
        msg: 'user signin'
    })
})
adminRouter.get('/course', function(req, res){
    return res.json({
        msg: 'user signin'
    })
})


module.exports = {
    adminRouter:adminRouter
}