/*
    Datastore Setup
    We're using NeDB since we're not operating at any scale.
*/
const Datastore = require('nedb')
let db = {}

//Create db in memory if testing.
if (process.env.NODE_ENV == 'test') {
    db.projects = new Datastore()
    db.posts = new Datastore()
    db.users = new Datastore()
} else {
    db.projects = new Datastore({ filename: './db/projects.ds', autoload: true })
    db.posts = new Datastore({ filename: './db/posts.ds', autoload: true })
    db.users = new Datastore({ filename: './db/users.ds', autoload: true })
}

// No duplicate commands.
db.users.ensureIndex({ fieldName: 'id', unique: true })
db.projects.ensureIndex({ fieldName: 'id', unique: true })

//Clear
db.clear = function () {
    return new Promise((resolve, reject) => {
        db.projects.remove({}, { multi: true }, function (err, numRemoved) {
            if (err) reject(err)
            db.posts.remove({}, { multi: true }, function (err, numRemoved) {
                if (err) reject(err)
                db.users.remove({}, { multi: true }, function (err, numRemoved) {
                    if (err) reject(err)
                    resolve()
                })
            })
        })
    })
}

module.exports = db;