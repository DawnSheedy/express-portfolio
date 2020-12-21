const Model = require('./model')

module.exports = class User extends Model {
    get defaults() {
        return {
            givenName: 'Given',
            familyName: 'Family',
            displayName: 'Given Family',
            email: 'email@example.org',
            iconURL: '',
            id: 'uuid'
        }
    }
}