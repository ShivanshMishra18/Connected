const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data) {
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''

    if (!validator.isLength(data.name, { min: 3, max: 30 })) {
        errors.name = 'Name must be between 3 and 30 characters'
    }
    
    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters'
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email should be valid'
    }

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required'
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required'
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is required'
    }
    
    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password is required'
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords should match'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}