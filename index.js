const express = require('express');

const {userRouter} = require('./route/user')
const {courseRouter} = require('./route/course')

const app = express();
const port = 3000;

app.use('/user', userRouter)

app.use('/course', courseRouter)

















app.listen(port, function(){
    console.log('server is running on port ' + port);
    
})


