import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import { deleteExperience } from '../../actions/profileActions'

class Experience extends Component {

  onDeleteClick(id) {
    this.props.deleteExperience(id)
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <tr id={exp._id} key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> - {' '}
          {
            (exp.to === null) ? ('Present') : (
              <Moment format="DD/MM/YYYY">{exp.to}</Moment>
            )
          }
        </td>
        <td>
          <button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    ))

    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>        
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th></th>
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    )
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience)
