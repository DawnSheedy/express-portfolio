const db = require('./datastore')
const ProjectModel = require('./../models/project')

let projects = {}


//Create
projects.create = (attributes = {}) => {
    //Create user object from attributes
    let project = new ProjectModel(attributes)

    //Insert into db, promise will be rejected if entry already exists or upon other error.
    return new Promise((resolve, reject) => {
        if (!attributes.id) reject("No id provided.")
        db.projects.insert(project, function (err, newDoc) {
            if (err) {
                reject(err)
            } else {
                resolve(newDoc)
            }
        })
    })
}

//Search
projects.find = (id = null) => {
    return new Promise((resolve, reject) => {
        db.projects.findOne({ id: id }, function (err, doc) {
            if (err || doc == null) {
                reject(err || doc)
            } else {
                resolve(doc)
            }
        })
    })
}


//Update
projects.update = (id = null, attributes = {}) => {
    return new Promise((resolve, reject) => {
        if (!id) reject('No id provided.')

        if (attributes.id && attributes.id !== id) {
            projects.find(attributes.id)
                .then(reject('Conflicting doc exists.'))
                .catch()
        }

        db.projects.update({ id: id }, { $set: attributes }, function (err, numReplaced) {
            if (err || numReplaced == 0) {
                reject(err || 'Target doc could not be found.')
            } else {
                projects.find(attributes.id || id)
                    .then(doc => {
                        resolve(doc)
                    })
            }
        })
    })
}


//Delete
projects.delete = (id = null) => {
    return new Promise((resolve, reject) => {
        if (!id) reject('No id provided.')

        db.projects.remove({ id: id }, function (err, numDeleted) {
            if (err || !numDeleted) {
                reject('Target doc could not be found.')
            } else {
                resolve(numDeleted)
            }
        })
    })
}

module.exports = projects