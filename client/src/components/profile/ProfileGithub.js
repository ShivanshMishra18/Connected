import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ProfileGithub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clientId: '42c846e4eae601f16744',
      clientSecret: 'c5a60ed7f195869362e91d813ab323091ade59cb',
      count: 5,
      sort: 'created: desc',
      repos: []
    }
  }

  componentDidMount() {
    const { username } = this.props
    const { clientId, clientSecret, count, sort } = this.state

    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&clientSecret=${clientSecret}`)
      .then(res => res.json())
      .then(data =>
       this.setState({ repos: data })  
      )
      .catch(e => console.log(e))
    
  }

  render() {
    const { repos } = this.state

    const githubList = repos.map(repo => (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <a 
                  href={repo.html_url} 
                  className="text-info" 
                  target="_blank" 
                  key={repo.id}
                  rel="noopener noreferrer"
                > 
                  { repo.name }
                </a>
              </h4>
              <p>{ repo.description }</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: { repo.stargazers_count }
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: { repo.watchers_count }
              </span>
              <span className="badge badge-success">
                Forks: { repo.forks_count }
              </span>
            </div>
          </div>
        </div>
    ))

    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        { githubList }
      </div>
    )
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
}

export default ProfileGithub