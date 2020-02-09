const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

const User = require('../../models/user')
const Profile = require('../../models/profile')

const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')

const router = express.Router()

// @router  GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req,res) => {
    res.send({
        msg: 'Working router profile'
    })
})


// @router  GET api/profile
// @desc    Get current user's profile
// @access  Private
router.get('', passport.authenticate('jwt', {session:false}), async (req,res) => {
    const errors = {}

    try {
        const profile = await Profile.findOne({ user: req.user })

        if (!profile) {
            errors.noprofile = 'There is no profile for this user'
            return res.status(404).send(errors)
        }

        res.send(profile)

    } catch (e) {
        res.status(500).send(e)
    }
})


// @router  GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', async (req,res) => {
    const errors = {}

    try {
        const profile = await Profile.findOne({ handle: req.params.handle })
        if (!profile) {
            errors.profile = 'Profile not found'
            res.status(404).send(errors)
        }
        await profile.populate('user', ['name', 'avatar']).execPopulate()
        res.send(profile)
    } catch (e) {
        errors.server = 'Internal server error'
        res.status(500).send(errors)
    }
})


// @router  GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', async (req,res) => {
    const errors = {}

    try {
        const profile = await Profile.findOne({ user: req.params.user_id })
        if (!profile) {
            errors.profile = 'Profile not found'
            res.status(404).send(errors)
        }
        await profile.populate('user', ['name', 'avatar']).execPopulate()
        res.send(profile)
    } catch (e) {
        errors.server = 'Internal server error'
        res.status(500).send(errors)
    }
})


// @router  GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', async (req,res) => {
    const errors = {}

    try {
        profiles = await Profile.find()
        if (!profiles) {
            errors.noprofile = 'No profile found'
            return res.send(errors)
        }
        
        for (let i=0; i<profiles.length; i++)
            await profiles[i].populate('user', ['name', 'avatar']).execPopulate()
        res.send(profiles)

    } catch (e) {
        res.status(500).send(e.message)
    }
})


// @router  POST api/profile
// @desc    Create/Update user profile
// @access  Private
router.post('', passport.authenticate('jwt', {session:false}), async (req,res) => {

    const { errors, isValid } = validateProfileInput(req.body)
    if (!isValid) {
        return res.status(400).send(errors)
    }

    const profileFields = {}
    profileFields.social = {}
    profileFields.user = req.user.id

    const possibleFields = ['handle','company','website','bio','githubusername','status','location']
    possibleFields.forEach( field => {
        if (req.body[field])   profileFields[field] = req.body[field]
    })
    
    if (req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',')
    }
    
    const socialFields = ['linkedin', 'facebook', 'instagram']
    socialFields.forEach( field => {
        if (req.body[field]) profileFields.social[field] = req.body[field]
    })

    try {
        const profile = await Profile.findOne({ user: req.user.id })

        if (profile) {
            const updatedprofile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            )
            await updatedprofile.populate('user', ['name', 'avatar']).execPopulate()
            return res.send(updatedprofile)
        }

        const isprofile = await Profile.findOne({ handle: req.body.handle })

        if (isprofile) {
            errors.handle = 'Handle already in use'
            return res.status(400).send(errors)
        }

        const newprofile = new Profile(profileFields)
        await newprofile.save()
        
        await newprofile.populate('user', ['name', 'avatar']).execPopulate()
        res.send(newprofile)

    } catch (e) {
        res.status(500).send()
    }

})


// @router  POST api/profile/experience
// @desc    Add experience to user profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', {session:false}), async (req,res) => {
    
    const { errors, isValid } = validateExperienceInput(req.body)
    if (!isValid) {
        return res.status(400).send(errors)
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id })
        
        if (!profile) {
            errors.noprofile = 'Create profile before adding experience'
            return res.status(400).send(errors)
        }
        
        const exp = { ...req.body }
        profile.experience.unshift(exp);
        console.log(profile.experience)
        
        await profile.save()
        res.send(profile)

    } catch (e) {
        errors.server = 'Internal server error'
        res.status(500).send(errors)
    }
})


// @router  POST api/profile/education
// @desc    Add education to user profile
// @access  Private
router.post('/education', passport.authenticate('jwt', {session:false}), async (req,res) => {
    
    const { errors, isValid } = validateEducationInput(req.body)
    if (!isValid) {
        return res.status(400).send(errors)
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id })
        
        if (!profile) {
            errors.noprofile = 'Create profile before adding education'
            return res.status(400).send(errors)
        }
        
        const edu = { ...req.body }
        profile.education.unshift(edu);
        console.log(profile.education)
        
        await profile.save()
        res.send(profile)

    } catch (e) {
        errors.server = 'Internal server error'
        res.status(500).send(errors)
    }
})


// @router  DELETE api/profile/experience/:exp_id
// @desc    Delete experience by id --- valid id sent via interface
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session:false}), async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })

        const idx = profile.experience.map( exp => exp.id ).indexOf(req.params.exp_id)
        profile.experience.splice(idx,1)

        await profile.save()
        res.send(profile)
    } catch (e) {
        const errors = { server: 'Internal server error' }
        res.status(500).send(errors)
    }
})


// @router  DELETE api/profile/education/:ed_id
// @desc    Delete education by id --- valid id sent via interface
// @access  Private
router.delete('/education/:ed_id', passport.authenticate('jwt', {session:false}), async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })

        const idx = profile.education.map( ed => ed.id ).indexOf(req.params.ed_id)
        profile.education.splice(idx,1)

        await profile.save()
        res.send(profile)
    } catch (e) {
        const errors = { server: 'Internal server error' }
        res.status(500).send(errors)
    }
})


// @router  DELETE api/profile
// @desc    Delete profile and user
// @access  Private
router.delete('', passport.authenticate('jwt', {session:false}), async (req,res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id })
        await User.findOneAndRemove({ _id: req.user.id })
        res.send({ success: true })
    } catch (e) {
        const errors = { server: 'Internal server error' }
        res.status(500).send(errors)
    }
})


module.exports = router