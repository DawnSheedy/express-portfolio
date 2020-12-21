const defaultsDeep = require('lodash/defaultsDeep')

module.exports = class Model {
    constructor(attributes = {}) {
        defaultsDeep(this, attributes, this.defaults)
    }
}