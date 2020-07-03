import axios from 'axios'

// This file takes care of adding the authorization token
// to the header every time

const setAuthToken = token => {
    if (token) {
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token
    } else {
        // Delete auth header
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthToken