const express = require('express')
const auth = require('./auth').middleware
const router = express.Router();

const projectController = require('./../controllers/projects')

/**
 * Get project with corresponding ID. No auth required.
 */
router.get('/', function (req, res) {
    projectController.find(req.params.id)
        .then(project => {
            res.json(project)
            res.end()
        })
        .catch(err => {
            res.send(404, "Not Found")
            res.end()
        })
})

/**
 * Create new project. Auth required.
 */
router.put('/', auth, function (req, res) {
    projectController.create({ id: req.params.id, title: req.params.title, description: req.params.description, url: req.parmas.url, headerImageURL: req.params.headerImageURL, year: req.params.year })
        .then(project => {
            res.json(project)
            res.end()
        })
        .catch(err => {
            res.send(500, "Error")
            res.end()
        })
})

/**
 * Delete project, auth required.
 */
router.delete('/', auth, function (req, res) {
    projectController.delete(req.params.id)
        .then(project => {
            res.send(true)
            res.end()
        })
        .catch(err => {
            res.send(500, "Not Found")
            res.end()
        })
})

module.exports = router