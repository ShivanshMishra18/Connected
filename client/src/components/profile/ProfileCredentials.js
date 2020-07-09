import React, { Component } from 'react'
import isEmpty from '../../validation/is-empty'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

class ProfileCredentials extends Component {
  render() {
    const { education, experience } = this.props

    const experienceList = experience.map(exp => (
      <li className="list-group-item" id={exp._id} key={exp._id}>
        <h4>{exp.company}</h4>
        <p>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> - {' '}
          {
            (exp.to === null) ? ('Present') : (
              <Moment format="DD/MM/YYYY">{exp.to}</Moment>
            )
          }
        </p>
        <p>
          <strong>Position: </strong> 
          {exp.title}
        </p>
        <p>
          {
            isEmpty(exp.location) ? null : (
              <span>
                <strong>Location: </strong>
                {exp.location}
              </span>
            )
          }
        </p>
        {
          isEmpty(exp.description) ? null : (
            <p>
              <strong>Description: </strong>
              {exp.description}
            </p>
          )
        }
      </li>
    ))

    const educationList = education.map(edu => (
      <li className="list-group-item" id={edu._id} key={edu._id}>
        <h4>{edu.school}</h4>
        <p>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> - {' '}
          {
            (edu.to === null) ? ('Present') : (
              <Moment format="DD/MM/YYYY">{edu.to}</Moment>
            )
          }
        </p>
        <p>
          <strong>Degree: </strong> 
          {edu.degree}
        </p>
        <p>
          <strong>Field of Study: </strong> 
          {edu.fieldofstudy}
        </p>
        {
          isEmpty(edu.description) ? null : (
            <p>
              <strong>Description: </strong>
              {edu.description}
            </p>
          )
        }
      </li>
    ))

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
            {
              experienceList.length === 0 ? 
              ("No Experience Listed") : (
                <ul className="list-group">
                { experienceList } 
                </ul>
              )
            }
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {
            educationList.length === 0 ? 
            ("No Education Listed") : (
              <ul className="list-group">
              { educationList } 
              </ul>
            )
          }
        </div>
      </div>
    )
  }
}

ProfileCredentials.propTypes = {
  education: PropTypes.array.isRequired,
  experience: PropTypes.array.isRequired
}

export default ProfileCredentials
