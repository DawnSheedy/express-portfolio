function app() {

    //Load express, which will handle the api and front-end hosting.
    require('./routes/expressLoader')()

    //Load datastore
    require('./controllers/datastore')
}

module.exports = app;