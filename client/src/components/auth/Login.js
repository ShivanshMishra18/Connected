import React, { Component } from 'react'

export class Login extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             email: '',
             password: '',
             errors: {}
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
    }
    
    render() {
        return (
            <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Sign in to your DevConnector account</p>
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input 
                        type="email" 
                        className="form-control form-control-lg" 
                        placeholder="Email Address" 
                        name="email" 
                        onClick={this.onClick}    
                    />
                    </div>
                    <div className="form-group">
                      <input 
                        type="password" 
                        className="form-control form-control-lg" 
                        placeholder="Password" 
                        name="password" 
                        onClick={this.onClick}
                    />
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

export default Login
