const express = require('express')
const bodyparser = require('body-parser')
const passport = require('passport')
require('./db/database')

const userRouter = require('./routes/api/user')
const profileRouter = require('./routes/api/profile')
const postRouter = require('./routes/api/post')

const port = process.env.PORT || 3000
const app = express()

// To access req.body
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

// Passport middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

app.use('/api/user', userRouter)
app.use('/api/profile', profileRouter)
app.use('/api/posts', postRouter)


app.listen(port, () => console.log('Server is running on port', port));