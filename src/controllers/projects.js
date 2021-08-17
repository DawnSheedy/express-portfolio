const db = require('./datastore')
const ProjectModel = require('./../models/project')

let projects = {}


/**
 * @function create Creates a new project object based on the model and inserts it into the datastore.
 * @param {*} attributes Object containing project information, based on the ProjectModel.
 * @returns Promise that will resolve with the new project DB document or reject if the document fails to insert.
 */
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

/**
 * @function projects.findAll Returns array with all projects that exist in the datastore.
 * @returns Promise that will resolve either with an empty array (if no projects exist) or an array of project data.
 */
projects.findAll = () => {
    return new Promise((resolve, reject) => {
        db.projects.find({}, function (err, docs) {
            if (err || docs == null) {
                resolve([])
            } else {
                resolve(docs)
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