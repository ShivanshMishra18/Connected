const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

const userRouter = require('./routes/api/user')
const profileRouter = require('./routes/api/profile')
const postRouter = require('./routes/api/post')

const port = process.env.PORT || 3000
const app = express()

// To access req.body
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

app.use('/api/user', userRouter)
app.use('/api/profile', profileRouter)
app.use('/api/posts', postRouter)

mongoose.connect('mongodb://127.0.0.1:27017/connected-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

app.get('', (req, res) => res.send('Hey'))

app.listen(port, () => console.log('Server is running on port', port));