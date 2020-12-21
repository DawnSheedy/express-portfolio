const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const jwtRequired = passport.authenticate('jwt', { session: false });

const authOnly = function (req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            res.send(401, "Access Denied")
            res.end()
        } else {
            next()
        }
    })(req, res)
}

const userController = require('./../controllers/users');
const e = require('express');

const router = express.Router();

router.get(
    '/login/google',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/');
    }
);

router.get('/access-check', authOnly, (req, res) => {
    res.send("Content")
})

router.get('/logout', (req, res) => {
    req.session.jwt = null
    return res.redirect('/')
})

router.get('/current-session', (req, res) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            res.send(false)
        } else {
            userController.find(user.id)
                .then((user) => res.send(user))
                .catch((err) => res.send(false))
        }
    })(req, res)
})

router.get('/version-info', authOnly, (req, res) => {
    res.json({
        appName: config.appName,
        organization: config.organization,
        version: config.version,
        environment: config.environment,
        startTime: config.startTime,
        channel: config.channel
    })
})

router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', { failureRedirect: "/" }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        const userReturnObject = {
            id: user.id
        };
        req.session.jwt = jwt.sign(userReturnObject, config.jwtKey);
        return res.redirect('/');
    })(req, res, next);
});

module.exports = { router: router, middleware: authOnly };