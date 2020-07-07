import React, { Component } from 'react'
import { connect } from 'mongoose'
import withRouter from 'react-router-dom'
import Moment from 'react-moment'

class Experience extends Component {
  render() {
    const experience = this.props.experience.map(exp => (
      <tr id={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="DD/MM/YY"> {exp.from} </Moment> - {' '}
          {
            (exp.to === null) ? ('Present') : (
              <Moment format="DD/MM/YY"> {exp.from} </Moment>
            )
          }
        </td>
        <button className="btn btn-danger">
          Delete
        </button>
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
          </thead>
          {experience}
        </table>
      </div>
    )
  }
}

export default connect(null)(withRouter(Experience))
