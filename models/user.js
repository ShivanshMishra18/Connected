const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})


userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.avatar

    return userObject
}


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});

    if (!user) {
        // throw new Error('User not found')
        throw { email: 'Email not registered' }
    }

    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch) {
        // throw new Error('Password does not match')
        throw { password: 'Password incorrect' }
    }

    return user
}


userSchema.pre('save', async function(next) {
    const user = this
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

// name of model - User - can be accessed as mongoose.model('User')
const User = mongoose.model('User', userSchema)

module.exports = User