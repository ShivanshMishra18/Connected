const express = require('express')
const gravatar = require('gravatar')

const router = express.Router()
const User = require('../../models/user')


// @router  GET api/user/test
// @desc    Tests user route
// @access  Public
router.get('/test', (req,res) => {
    res.send({
        msg: 'Working router user'
    })
})


// @router  GET api/user/register
// @desc    Register User
// @access  Public
router.post('/register', async (req,res) => {
    
    try {
        const isuser = await User.findOne({email: req.body.email})
        if (isuser) {
            return res.status(400).send('Account with email already exists!')
        }
        
        const avatar = gravatar.url(req.body.email, {
            s: '200',   //Size
            r: 'pg',    //Rating
            d: 'mm'     //Default
        })

        console.log(req.body)
    
        const user = new User({
            ...req.body,
            avatar
        })
        
        await user.save()
        res.status(201).send(user)
    } 
    catch (e) {
        res.status(500).send(e)
    }
    
})

module.exports = router