const {Router} = require('express')
const {adminModel} = require('../db/db')
const adminRouter = Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET_ADMIN = '12323asSfaSdfDW'
const {z} = require('zod');
const bcrypt = require('bcrypt')

adminRouter.post('/signup', async function(req, res){
    
    const requireBody = z.object({
        email: z.string().email('enter a valid email').min(6, 'minimum 6 character').max(60, 'maximum 60 character'),
        password: z.string().min(6, 'minimum 6 character').max(60, 'maximum 60 character'),
        firstName: z.string().max(60, 'maximum 60 character'),
        lastName: z.string().max(60, 'maximum 60 character')
    })

   
    const parsedBody = requireBody.safeParse(req.body)
    if(!parsedBody.success){
        return res.json({
            msg: 'invalid admin input',
            err: parsedBody.error.issues
        })
    }

    const {email, password, firstName, lastName} = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 2)

        await adminModel.create({
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


adminRouter.post('/signin', async function(req, res){
    
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

    const admin = await adminModel.findOne({
        email
    })

    if(!admin){
        return res.status(401).json({
            msg : 'email not found'
        })
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password)

    if(isPasswordValid){
       const token = jwt.sign({
        id: admin._id
       }, JWT_SECRET_ADMIN)

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


adminRouter.post('/course', function(req, res){
    return res.json({
        msg: 'admin signin'
    })
})
adminRouter.put('/course', function(req, res){
    return res.json({
        msg: 'admin signin'
    })
})
adminRouter.get('/course', function(req, res){
    return res.json({
        msg: 'admin signin'
    })
})


module.exports = {
    adminRouter:adminRouter
}