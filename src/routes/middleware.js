const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const JwtStrategy = require('passport-jwt').Strategy
const config = require('./../../config')
const userController = require('./../controllers/users')

module.exports = (app) => {


    const googleStrategy = new GoogleStrategy({
        clientID: config.googleClientID,
        clientSecret: config.googleClientSecret,
        callbackURL: config.googleCallbackURL,
        scope: ["email", "profile", "openid"]
    },
    function(accessToken, refreshToken, profile, done) {
        userController.createOrFind(profile)
            .then((user) => {
                return done(null, user);
            })
            .catch((err) => {
                return done(err, null);
            })
    })

    const jwtStrategy = new JwtStrategy({
        jwtFromRequest: (req) => req.session.jwt,
        secretOrKey: config.jwtKey
    }, (payload, done) => {
        return done(null, payload)
    })

    passport.use(googleStrategy)
    passport.use(jwtStrategy)

    app.use(passport.initialize())
}