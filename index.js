require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')

const mongoDBurl = process.env.MONGODB_URL




const { userRouter } = require('./route/user')
const { courseRouter } = require('./route/course')
const { adminRouter } = require('./route/admin')

const app = express();
const port = 3000;

app.use('/user', userRouter)
app.use('/course', courseRouter)
app.use('/admin', adminRouter)







async function main() {

    await mongoose.connect(mongoDBurl + 'Coursera')

    app.listen(port, function () {
        console.log('server is running on port ' + port);

    })
}


main()