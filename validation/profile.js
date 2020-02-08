const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data) {
    let errors = {}

    const allFields = ['handle', 'status', 'skills', 'website', 'linkedin', 'facebook', 'instagram']
    
    allFields.forEach( field => {
        data[field] = !isEmpty(data[field]) ? data[field] : ''
    })

    if (!validator.isLength(data.handle, {min:3, max:30})) {
        errors.handle = 'Handle should be at least 3 characters'
    }

    if (validator.isEmpty(data.handle)) {
        errors.handle = 'Handle field is required'
    }

    if (validator.isEmpty(data.status)) {
        errors.status = 'Status field is required'
    }

    if (validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required'
    }

    const urlFields = ['website', 'linkedin', 'facebook', 'instagram']
    urlFields.forEach( field => {
        if (!validator.isEmpty(data[field])) {
            if (!validator.isURL(data[field])) {
                errors[field] = 'URL is invalid'
            }
        }
    })

    return {
        errors,
        isValid: isEmpty(errors)
    }
}