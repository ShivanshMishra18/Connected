const express = require('express')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const passport = require('passport')

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


// @router  POST api/user/register
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


// @router  POST api/user/login
// @desc    Login User / Return JWT
// @access  Public
router.post('/login', async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const payload = {id: user.id, name: user.name, avatar: user.avatar}
        const token = jwt.sign(payload, 'secretkey')

        res.send({ user, token: 'Bearer '+ token })        
    } catch (e) {
        // console.log(typeof(e), e.Error)
        res.status(400).send('Login Failed')
    }
})


// @router  GET api/user/current
// @desc    Return Current User
// @access  Private
router.get('/current', passport.authenticate('jwt', {session:false}), async (req,res) => {
    res.send(req.user)
})

module.exports = router