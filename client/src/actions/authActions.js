import { GET_ERRORS, SET_CURRENT_USER } from "./types"
import axios from 'axios'
import setAuthToken from "../utils/setAuthToken"
import jwt_decode from 'jwt-decode'


// Register User
export const registerUser = (userData, history) => async dispatch => {
    try {
        await axios.post('/api/user/register', userData) // no response required
        history.push('/login')      // redirecting to the login page
    } 
    catch (err) {
        // this.setState({ errors: err.response.data }) 
        // cannot perform it here as outside register component
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}
// Double arrow is used to denote that a function is being returned
// This is possible with thunk
// Syntax can used to normally return function as well (like login)


// Login - Get Auth Token
export function loginUser(userData){
    return async function f(dispatch) {
        try {
            const res = await axios.post('/api/user/login', userData)
            // Save to local storage
            const { token } = res.data
            // Set token to local storage
            localStorage.setItem('jwtToken', token)
            // Set token to Auth header
            setAuthToken(token)
            // Decode token to get user data
            const decoded = jwt_decode(token)
            // Set current user
            dispatch(setCurrentUser(decoded))
        } 
        catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
    }
} 

    
// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}