import React, { Component } from 'react'
import isEmpty from '../../validation/is-empty'

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props

    const skillSet = profile.skills.map((skill, idx) => (
      <div className="p-3" id={idx}>
        <i className="fa fa-check" />
        {skill}
      </div>
    ))

    return (
      <div class="row">
        <div class="col-md-12">
          <div class="card card-body bg-light mb-3">
          {
            isEmpty(profile.bio) ? null : (
              <div>
                <h3 class="text-center text-info">
                {profile.user.name.trim().split(' ')[0]}'s Bio
                </h3>
                <p class="lead">
                  {profile.bio}
                </p>
              </div>
            )
          }
            <hr />
            <h3 class="text-center text-info">Skill Set</h3>
            <div class="row">
              <div class="d-flex flex-wrap justify-content-center align-items-center">
                {skillSet}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileAbout
