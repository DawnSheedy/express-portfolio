const chai = require('chai')
const chaiAsPromied = require('chai-as-promised')
chai.use(chaiAsPromied)

let assert = chai.assert
let expect = chai.expect
chai.should()

let db = require('../src/controllers/datastore')

let userController = require('../src/controllers/users')
const users = require('../src/controllers/users')

beforeEach(function () {
    return new Promise(async (resolve) => {
        await userController.create({ id: '000000' })
        await userController.create({ id: '000001' })
        await userController.create({ id: '134178477' })
        resolve()
    })
})

afterEach(function () {
    return db.clear()
})

describe('User Controller', function () {
    describe("#.createOrFind()", function () {
        it('should resolve and show the document if id exists', function () {
            return userController.createOrFind({id: '134178477'}).should.eventually.have.property('id', '134178477')
        })
        it('should create and show the document if id does not exist', function () {
            return userController.createOrFind({id: '44322889', name: {givenName: 'Dawn', familyName: 'Sheedy'}, photos: [{value: 'photoURL'}], emails: [{value: 'email@email.com'}]}).should.eventually.have.property('id', '44322889')
        })
        it('should reject if id is not provided', function () {
            return userController.createOrFind().should.be.rejected
        })
    })
    describe('#.create()', function () {
        it('should resolve and show the new document if inserted correctly', function () {
            return userController.create({ id: '000002' }).should.eventually.have.property('id', '000002')
        })
        it('should reject if inserting a duplicate', function () {
            return userController.create({ id: '000000' }).should.be.rejected
        })
        it('should reject if inserting without an id', function () {
            return userController.create({}).should.be.rejected
        })
    })

    describe('#.find()', function () {
        it('should resolve with found doc if command exists', function () {
            return userController.find('000000').should.eventually.have.property('id', '000000')
        })
        it('should reject if command does not exist', function () {
            return userController.find('000003').should.be.rejected
        })
    })

    describe('#.update()', function () {
        it('should resolve with updated doc if target doc exists', function () {
            return userController.update('000000', { name: 'Updated name.' }).should.eventually.have.property('name', 'Updated name.')
        })
        it('should reject if target doc does not exist', function () {
            return userController.update('000003', { name: 'updatedname' }).should.be.rejected
        })
        it('should reject if target doc\'s new invocation phrase conflicts with an existing one', function () {
            return userController.update('000000', { id: '000001' }).should.be.rejected
        })
    })

    describe('#.delete()', function () {
        it('should resolve with number of deleted docs, which should be 1', function () {
            return userController.delete('000000').should.eventually.equal(1)
        })
        it('should reject if target doc does not exist', function () {
            return userController.delete('000003').should.be.rejected
        })
    })
})