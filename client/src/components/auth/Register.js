import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import { withRouter } from 'react-router-dom'   

export class Register extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault()

        const newUser = {
            name: this.state.name,
            password: this.state.password,
            password2: this.state.password2,
            email: this.state.email
        }

        this.props.registerUser(newUser, this.props.history)    // enabling this.props.history.push in authActions

    }

    render() {

        // const {errors} = this.state // used to access errors without this.state
        // const { user } = this.props.auth // to est mapStateToProps
        
        return (   
        <div className="register"> 
            {/* {user ? user.name : null} */}
            <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your Connected account</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <input
                        type="text" 
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': this.state.errors.name
                        })} 
                        placeholder="Name" 
                        name="name" 
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    {this.state.errors.name && (
                        <div className="invalid-feedback">
                            {this.state.errors.name}
                        </div>
                    )}
                    </div>
                    <div className="form-group">
                    <input 
                        type="email" 
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': this.state.errors.email
                        })} 
                        placeholder="Email Address" 
                        name="email" 
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                    {this.state.errors.email && (
                        <div className="invalid-feedback">
                            {this.state.errors.email}
                        </div>
                    )}
                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                    </div>
                    <div className="form-group">
                    <input 
                        type="password" 
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': this.state.errors.password
                        })} 
                        placeholder="Password" 
                        name="password" 
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    {this.state.errors.password && (
                        <div className="invalid-feedback">
                            {this.state.errors.password}
                        </div>
                    )}
                    </div>
                    <div className="form-group">
                    <input 
                        type="password" 
                        className={classnames('form-control form-control-lg', {
                            'is-invalid': this.state.errors.password2
                        })} 
                        placeholder="Confirm Password" 
                        name="password2" 
                        value={this.state.password2}
                        onChange={this.onChange}
                    />
                    {this.state.errors.password2 && (
                        <div className="invalid-feedback">
                            {this.state.errors.password2}
                        </div>
                    )}
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
                </div>
            </div>
            </div>
        </div>
        )
    }
}

Register.propTypes = {      // Adding additional properties to Register
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})  // to enable use of auth state with this.props.auth

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
