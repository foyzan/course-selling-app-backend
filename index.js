require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const mongoDBurl = process.env.MONGODB_URL;

const { userRouter } = require('./route/user');
const { courseRouter } = require('./route/course');
const { adminRouter } = require('./route/admin');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Add this middleware

app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter);

async function main() {
    try {
        await mongoose.connect(mongoDBurl + 'Coursera');
        console.log('Connected to MongoDB');
        app.listen(port, function () {
            console.log('server is running on port ' + port);
        });
        
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
}

main();