const express = require('express');




const app = express();
const port = 3000;


app.post('/user/signup', function(req, res){
    return res.json({
        msg: 'user signup';
    })
})
app.post('/user/signin', function(req, res){
    return res.json({
        msg: 'user signin';
    })
})
app.get('/user/purchases', function(req, res){
    return res.json({
        msg: 'user signup';
    })
})
app.post('/course', function(req, res){
    return res.json({
        msg: 'user signup';
    })
})














app.listen(port, function(){
    console.log('server is running on port ' + port);
    
})


