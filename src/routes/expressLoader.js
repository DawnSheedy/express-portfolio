module.exports = (server) => {
    const http = require('http')


    const passport = require('passport')
    const express = require('express')
    const session = require('cookie-session')
    const helmet = require('helmet')
    const hpp = require('hpp')
    const middleware = require('./middleware')
    const authRoutes = require('./auth')
    const config = require('./../../config')

    const app = express()
    const port = config.port

    var server = null

    if (process.env.NODE_ENV !== 'prod') {
        //HTTP for dev
        server = http.createServer(app)
    } else {
        //TODO HTTPS
    }
    
    //Security
    app.use(helmet())
    app.use(hpp())

    //Setup cookies
    app.use(
        session({
            name: 'session',
            secret: config.sessionSecret,
            expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour sessions
        })
    );


    app.use(passport.initialize())

    middleware(app);

    app.use('/auth', authRoutes)

    app.get('/', (req, res) => {
        res.send('Home')
    })

    //TODO: API Endpoints

    server.listen(port, () => {
        console.log('Bot API running on port '+port)
    })
}