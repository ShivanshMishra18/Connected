const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

const router = express.Router()

const Post = require('../../models/post')

const validatePostInput = require('../../validation/post')

// @router  GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req,res) => {
    res.send({
        msg: 'Working router post'
    })
})


// @router  GET api/posts
// @desc    Get all posts
// @access  Public
        // Posts are not populated
router.get('', async (req,res) => {

    try {
        const posts = await Post.find()
        if (!posts) {
            return res.send('There are no posts')
        }
        posts.sort((a,b) => (a.date < b.date) ? 1 : -1)

        res.send(posts)
    } catch (e) {
        console.log(e)
        const errors = { server: 'Internal sever error' }
        res.status(500).send(errors)    
    }
})


// @router  GET api/posts/:id
// @desc    Get post by ID
// @access  Public
        // Posts are not populated
router.get('/:id', async (req,res) => {
    const errors = {}
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            errors.postnotfound = `Post not with id ${req.params.id} found`
            return res.status(404).send(errors)
        }
        res.send(post)
    } catch (e) {
        console.log(e)
        errors.server = 'Internal sever error'
        res.status(500).send(errors)    
    }
})


// @router  POST api/posts
// @desc    Create a new post
// @access  Private
router.post('', passport.authenticate('jwt', {session:false}), async (req,res) => {

    const { errors, isValid } = validatePostInput(req.body)
    if (!isValid) {
        return res.status(400).send(errors)
    }

    try {
        const post = new Post({
            user: req.user.id,
            text: req.body.text,            // Name and avatar will come from REACT/REDUX States
            name: req.body.name,
            avatar: req.body.avatar
        })

        await post.save()
        res.send(post)
    } catch (e) {
        const errors = { server: 'Internal sever error' }
        res.status(500).send(errors)
    }
})


// @router  POST api/posts/like/:id
// @desc    'Like' a post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {session:false}), async (req,res) => {
    errors = {}

    try {
        const post = await Post.findById(req.params.id)
        // nopost error = 0 since request by button

        if (!post.likes.every( like => like.user.toString() !== req.user.id )) {
            errors.alreadyliked = 'You cannot like a post more than once'
            return res.status(400).send(errors)
        }

        post.likes.unshift({ user: req.user.id })
        await post.save()
        res.send(post)

    } catch (e) {
        const errors = { server: 'Internal sever error' }
        console.log(e)
        res.status(500).send(errors)
    }
})


// @router  POST api/posts/unlike/:id
// @desc    'Unlike' a post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', {session:false}), async (req,res) => {
    errors = {}

    try {
        const post = await Post.findById(req.params.id)
        // nopost error = 0 since request by button

        if (post.likes.every( like => like.user.toString() !== req.user.id )) {
            errors.notliked = 'You cannot unlike this post'
            return res.status(400).send(errors)
        }

        const idx = post.likes.map( like => like.user ).indexOf(req.user.id)
        post.likes.splice(idx, 1)

        await post.save()
        res.send(post)

    } catch (e) {
        const errors = { server: 'Internal sever error' }
        console.log(e)
        res.status(500).send(errors)
    }
})


// @router  DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session:false}), async (req,res) => {
    errors = {}

    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            errors.postnotfound = `Post with id ${req.params.id} not found`
            return res.status(404).send(errors)
        }

        if (post.user.toString() !== req.user.id) {
            errors.unauthorized = 'You are not authorized to perform this action'
            return res.status(401).send(errors)
        }

        await post.remove()
        res.send({ success: true })

    } catch (e) {
        const errors = { server: 'Internal sever error' }
        res.status(500).send(errors)
    }

})

module.exports = router