const Model = require('./model')

module.exports = class User extends Model {
    get defaults() {
        return {
            id: 'uuid',
            title: 'Sample Project',
            description: 'sample description (can be HTML)',
            url: 'project url',
            headerImageURL: 'header image url',
            year: '2020'
        }
    }
}