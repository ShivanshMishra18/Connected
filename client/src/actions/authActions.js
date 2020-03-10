import { GET_ERRORS } from "./types"
import axios from 'axios'


export const registerUser = (userData, history) => async dispatch => {
    
    try {
        await axios.post('/api/user/register', userData)
        // console.log(res.data)
        history.push('/login')      // redirecting to the login page
    } catch (err) {
        // console.log(err.response.data)
        // this.setState({ errors: err.response.data }) // cannot perfor this here as outside register component
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}