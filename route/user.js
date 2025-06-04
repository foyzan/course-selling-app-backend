const {Router} = require('express');

const jwt = require('jsonwebtoken');
const {JWT_SECRET_USER} = require('../config')
const {z} = require('zod');
const bcrypt = require('bcrypt')
const userRouter = Router();



const {userModel} = require('../db/db');


userRouter.post('/signup', async function(req, res){
    
    const requireBody = z.object({
        email: z.string().email('enter a valid email').min(6, 'minimum 6 character').max(60, 'maximum 60 character'),
        password: z.string().min(6, 'minimum 6 character').max(60, 'maximum 60 character'),
        firstName: z.string().max(60, 'maximum 60 character'),
        lastName: z.string().max(60, 'maximum 60 character')
    })

   
    const parsedBody = requireBody.safeParse(req.body)
    if(!parsedBody.success){
        return res.json({
            msg: 'invalid user input',
            err: parsedBody.error.issues
        })
    }

    const {email, password, firstName, lastName} = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 2)

        await userModel.create({
            email : email,
            password : hashedPassword,
            firstName : firstName,
            lastName : lastName
        })
    } catch(err){
        res.status(401).json({error: err})
    }

    res.json({
        msg: 'successfully signed up'
    })
})


userRouter.post('/signin', async function(req, res){
    
    const requireBody = z.object({
        email: z.string().email('enter a valid email').min(6, 'minimum 6 character').max(60, 'maximum 60 character'),
        password: z.string().min(6, 'minimum 6 character').max(60, 'maximum 60 character'),
    })

    const parsedBody = requireBody.safeParse(req.body);

    if(!parsedBody.success){
        return res.status(401).json({
            msg : parsedBody.error.issues
        })
    }

    const {email, password} = req.body;

    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(401).json({
            msg : 'email not found'
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(isPasswordValid){
       const token = jwt.sign({
        id: user._id
       }, JWT_SECRET_USER)

       return res.json({
        msg : 'successfully logIn',
        token : token
       })
    }else{
        return res.status(400).json({
            msg: 'invalid password'
        })
    }
})


userRouter.get('/purchased', function(req, res){
    return res.json({
        msg: 'user signup'
    })
})

module.exports = {
    userRouter:userRouter
}