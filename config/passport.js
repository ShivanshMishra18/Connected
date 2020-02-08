const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('User')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secretkey'
}

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            
            try {
                const user = await User.findById(jwt_payload.id)
                if (!user) {
                    return done(null, false)
                }
                return done(null, user)
            } catch (e) {
                console.log(e)
            }

    }))
}
