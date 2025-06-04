const { Router } = require('express')


const { z } = require('zod');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { adminModel, courseModel } = require('../db/db')
const { JWT_SECRET_ADMIN } = require('../config')

const { adminMiddleware } = require('../middleware/adminMiddleware');
const user = require('./user');



const adminRouter = Router();

adminRouter.post('/signup', async function (req, res) {

    const requireBody = z.object({
        email: z.string().email('enter a valid email').min(6, 'minimum 6 character').max(60, 'maximum 60 character'),
        password: z.string().min(6, 'minimum 6 character').max(60, 'maximum 60 character'),
        firstName: z.string().max(60, 'maximum 60 character'),
        lastName: z.string().max(60, 'maximum 60 character')
    })


    const parsedBody = requireBody.safeParse(req.body)
    if (!parsedBody.success) {
        return res.json({
            msg: 'invalid admin input',
            err: parsedBody.error.issues
        })
    }

    const { email, password, firstName, lastName } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 2)

        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
    } catch (err) {
        res.status(401).json({ error: err })
    }

    res.json({
        msg: 'successfully signed up'
    })
})


adminRouter.post('/signin', async function (req, res) {

    const requireBody = z.object({
        email: z.string().email('enter a valid email').min(6, 'minimum 6 character').max(60, 'maximum 60 character'),
        password: z.string().min(6, 'minimum 6 character').max(60, 'maximum 60 character'),
    })

    const parsedBody = requireBody.safeParse(req.body);

    if (!parsedBody.success) {
        return res.status(401).json({
            msg: parsedBody.error.issues
        })
    }

    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email
    })

    if (!admin) {
        return res.status(401).json({
            msg: 'email not found'
        })
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password)

    if (isPasswordValid) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_SECRET_ADMIN)

        return res.json({
            msg: 'successfully logIn',
            token: token
        })
    } else {
        return res.status(400).json({
            msg: 'invalid password'
        })
    }
})


adminRouter.post("/course", adminMiddleware, async function (req, res) {



    const requireBody = z.object({
        title: z.string().min(15).max(60),
        description: z.string().min(5).max(1500),
        price: z.number().min(1).positive().max(500),
        imageUrl: z.string(),

    });

    const parsedBody = requireBody.safeParse(req.body);

    if (!parsedBody.success) {
        return res.status(403).json({
            msg: parsedBody.error.issues
        })
    }

    const { title, description, price, imageUrl } = req.body;
    const creatorId = req.userId;

    try {
        const course = await courseModel.create({
            title,
            description,
            price,
            imageUrl,
            creatorId
        })

        if(course){
            res.json({
            msg: "course",
            cosureId : course._id
        })
        }
    } catch (err) {
        res.json({
            msg: "course create error",
            err: err
        })
    }
});
adminRouter.put('/course', function (req, res) {
    return res.json({
        msg: 'admin signin'
    })
})
adminRouter.get('/course', function (req, res) {
    return res.json({
        msg: 'admin signin'
    })
})


module.exports = {
    adminRouter: adminRouter
}