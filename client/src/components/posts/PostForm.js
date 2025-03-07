import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import { addPost } from '../../actions/postAction'

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  } 

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit(e) {
    e.preventDefault()

    const { user } = this.props.auth
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    }

    this.props.addPost(newPost)
    this.setState({ text: '' })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Say Somthing...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a Post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={this.state.errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
})

PostForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { addPost })(PostForm)
