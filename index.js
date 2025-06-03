const express = require('express');

const {userRouter} = require('./route/user')
const {courseRouter} = require('./route/course')
const {adminRouter} = require('./route/admin')

const app = express();
const port = 3000;

app.use('/user', userRouter)
app.use('/course', courseRouter)
app.use('/admin', adminRouter)





app.listen(port, function(){
    console.log('server is running on port ' + port);
    
})


