const chai = require('chai')
const chaiAsPromied = require('chai-as-promised')
chai.use(chaiAsPromied)

let assert = chai.assert
let expect = chai.expect
chai.should()

let db = require('../src/controllers/datastore')

let projectController = require('../src/controllers/projects')

beforeEach(function () {
    return new Promise(async (resolve) => {
        await projectController.create({ id: 'sample-1' })
        await projectController.create({ id: 'sample-2' })
        await projectController.create({ id: 'sample-3' })
        resolve()
    })
})

afterEach(function () {
    return db.clear()
})

describe('Project Controller', function () {
    describe("#.create()", function () {
        it('should create and show the document if id does not exist', function () {
            return projectController.create({id: 'sample-4'}).should.eventually.have.property('id', 'sample-4')
        })
        it('should reject if id exists', function() {
            return projectController.create({id: 'sample-1'}).should.be.rejected
        })
        it('should reject if id is not provided', function () {
            return projectController.create().should.be.rejected
        })
    })
    describe('#.find()', function () {
        it('should resolve with found doc if project exists', function () {
            return projectController.find('sample-2').should.eventually.have.property('id', 'sample-2')
        })
        it('should reject if command does not exist', function () {
            return projectController.find('does-not-exist').should.be.rejected
        })
    })
    describe('#.update()', function () {
        it('should resolve with updated doc if target doc exists', function () {
            return projectController.update('sample-1', { title: 'Updated title.' }).should.eventually.have.property('title', 'Updated title.')
        })
        it('should reject if target doc does not exist', function () {
            return projectController.update('sample-4', { title: 'updatedname' }).should.be.rejected
        })
        it('should reject if target doc\'s new invocation phrase conflicts with an existing one', function () {
            return projectController.update('sample-1', { id: 'sample-2' }).should.be.rejected
        })
    })
    describe('#.delete()', function () {
        it('should resolve with number of deleted docs, which should be 1', function () {
            return projectController.delete('sample-1').should.eventually.equal(1)
        })
        it('should reject if target doc does not exist', function () {
            return projectController.delete('sample-4').should.be.rejected
        })
    })
    describe('#.findAll()', function () {
        it('should resolve with an array containing all of the docs', function () {
            return projectController.findAll().should.eventually.have.length(3)
        })
        it('should return an empty array if no docs exist or if an error occurs', function () {
            db.clear()
            return projectController.findAll().should.eventually.have.length(0)
        })
    })
})