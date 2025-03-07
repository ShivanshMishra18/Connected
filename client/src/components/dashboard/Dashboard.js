import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import Spinner from '../common/Spinner'
import ProfileButtons from './ProfileButtons'
import Experience from './Experience'
import Education from './Education'
 
class Dashboard extends Component {
    
    componentDidMount() {
      // TODO : Unauthorized request to reach dashboard
      // if (!this.props.auth.isAuthenticated) {
      //     this.props.history.push('/login')
      // }
      // However, we will use Private Router to do this

      this.props.getCurrentProfile()
    }

    onDeleteProfile(e) {
      this.props.deleteAccount()
    }
    
    render() {

      const { user } = this.props.auth
      const { profile, loading } = this.props.profile

      let dashboardContent

      if (profile === null || loading) {
          dashboardContent = <Spinner />
      } 
      else {
        // If logged in user has profile
        if (Object.keys(profile).length) {
          dashboardContent = (
            <div>
              <p className="lead text-muted"> Welcome 
                <Link to={`/profile/${profile.handle}`}> {user.name} </Link>
              </p>
              <ProfileButtons />
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
              <div style={{marginBottom: '60px'}} />
              <button onClick={this.onDeleteProfile.bind(this)} className="btn btn-danger">
                Delete My Account
              </button>
            </div>
          )
        }
        // If logged in user's profile is empty
        else 
        {
          dashboardContent = (
            <div>
              <p className="lead text-muted">Welcome {user.name}</p>
              <p> Your profile is empty, please add some info </p>
              <Link to="/create-profile" className="btn btn-lg btn-info">
                Create Profile
              </Link>
            </div>
          )
        }
      }

      return (
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                  <h1 className="display-4">Dashboard</h1>
                  { dashboardContent }
              </div>
            </div>
          </div>                
        </div>
      )
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)