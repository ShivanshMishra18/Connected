const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateExperienceInput(data) {
    let errors = {}

    const allFields = ['title','from','company']
    
    allFields.forEach( field => {
        data[field] = !isEmpty(data[field]) ? data[field] : ''
        
        if (validator.isEmpty(data[field])) {
            errors[field] = field.charAt(0).toUpperCase() + field.slice(1) + ' field is required'
        }
    }) 

    return {
        errors,
        isValid: isEmpty(errors)
    }
}