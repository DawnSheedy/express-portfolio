const express = require('express')
const auth = require('./auth').middleware
const router = express.Router();

//Get array of projects
router.get('/', function(req, res) {

})

//Create new project
router.put('/', auth, function (req, res) {

})

//Delete project
router.delete('/', auth, function (req, res) {

})