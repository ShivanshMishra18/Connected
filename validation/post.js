const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data) {
    let errors = {}

    data.text = !isEmpty(data.text) ? data.text : ''

    if (!validator.isLength(data.text, {min:2, max:200})) {
        errors.text = 'Text should be between 2 and 200 characters'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}