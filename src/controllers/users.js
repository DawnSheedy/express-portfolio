/*
    User Controller
    Manages users.
*/

const db = require('./datastore.js')
let User = require('../models/user.js')

let users = {}

//Pulled from stackoverflow
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

users.createOrFind = (userObj = null) => {
    return new Promise((resolve, reject) => {
        users.find(userObj.id)
            .then((user) => resolve(user))
            .catch(() => {
                users.create({ id: userObj.id, givenName: userObj.name.givenName || '', familyName: userObj.name.familyName || '', displayName: userObj.displayName || '', email: userObj.emails[0].value || '', iconURL: userObj.photos[0].value || '' })
                    .then((user) => resolve(user))
                    .catch((err) => reject(err))
            })
    })
}

users.create = (attributes = {}) => {
    let user = new User(attributes)

    return new Promise((resolve, reject) => {
        if (!attributes.id) reject("No id provided.")
        db.users.insert(user, function (err, newDoc) {
            if (err) {
                reject(err)
            } else {
                resolve(newDoc)
            }
        })
    })
}

users.find = (id = null) => {
    return new Promise((resolve, reject) => {
        db.users.findOne({ id: id }, function (err, doc) {
            if (err || doc == null) {
                reject(err || doc)
            } else {
                resolve(doc)
            }
        })
    })
}

users.update = (id = null, attributes = {}) => {
    return new Promise((resolve, reject) => {
        if (!id) reject('No id provided.')

        if (attributes.id && attributes.id !== id) {
            users.find(attributes.id)
                .then(reject('Conflicting doc exists.'))
                .catch()
        }

        db.users.update({ id: id }, { $set: attributes }, function (err, numReplaced) {
            if (err || numReplaced == 0) {
                reject(err || 'Target doc could not be found.')
            } else {
                users.find(attributes.id || id)
                    .then(doc => {
                        resolve(doc)
                    })
            }
        })
    })
}

users.delete = (id = null) => {
    return new Promise((resolve, reject) => {
        if (!id) reject('No id provided.')

        db.users.remove({ id: id }, function (err, numDeleted) {
            if (err || !numDeleted) {
                reject('Target doc could not be found.')
            } else {
                resolve(numDeleted)
            }
        })
    })
}

module.exports = users