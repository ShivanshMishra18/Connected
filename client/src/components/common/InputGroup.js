import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    icon,
    type,
    onChange
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon} />  
                </span>
            </div>
            <input 
                type={type} 
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })} 
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {
                error && 
                (
                    <div className="invalid-feedback">
                        {error}
                    </div>
                )
            }
        </div>
    )
}

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

InputGroup.defaultProps = {
    type: 'text'
}

export default InputGroup