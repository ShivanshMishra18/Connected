import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import { withRouter } from 'react-router-dom'   
import TextFieldGroup from '../common/TextFieldGroup'

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

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
          this.props.history.push('/dashboard')
        }
    }

    // Using errors / props as state 
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

        const {errors} = this.state // used to access errors without this.state
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

                    <TextFieldGroup 
                        name="name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.onChange}
                        error={errors.name}
                    />

                    <TextFieldGroup 
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                        info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                    />

                    <TextFieldGroup 
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.onChange}
                        error={errors.password}
                    />

                    <TextFieldGroup 
                        name="password2"
                        type="password"
                        placeholder="Confirm Password"
                        value={this.state.password2}
                        onChange={this.onChange}
                        error={errors.password2}
                    />
 
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

// withRouter allows us to enable redirection from inside the action
export default connect(mapStateToProps, { registerUser })(withRouter(Register))
