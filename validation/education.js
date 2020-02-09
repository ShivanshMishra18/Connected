const validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateEducationInput(data) {
    let errors = {}

    const allFields = ['school','degree','fieldofstudy','from']
    
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