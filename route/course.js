const {Router} = require('express');

const courseRouter = Router()


courseRouter.post('/purchase', function(req, res){
    return res.json({
        msg: 'user signup'
    })
})

courseRouter.get('/preview', function(req, res){
    return res.json({
        msg: 'user signup'
    })
})


module.exports = {
    courseRouter:courseRouter
}