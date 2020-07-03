import { GET_ERRORS, SET_CURRENT_USER } from "./types"
import axios from 'axios'
import setAuthToken from "../utils/setAuthToken"
import jwt_decode from 'jwt-decode'

// Register User
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

// Login - Get Auth Token
export const loginUser = userData => dispatch => {
    
    axios.post('/api/user/login', userData)
    .then(res => {
        // Save to local storage
        const { token } = res.data
        // Set token to local storage
        localStorage.setItem('jwtToken', token)
        // Set token to Auth header
        setAuthToken(token)
        // Decode token to get user data
        const decoded = jwt_decode(token)
        // Set current user
        dispatch(setCurrentUser(decoded))}
    )
    .catch(err => {
      dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

// Login - Get Auth Token
// export function loginUser(userData){
//     return async function f(dispatch) {
//         try {
//             const res = await axios.post('/api/user/login', userData)
//             // Save to local storage
//             const { token } = res.data
//             // Set token to local storage
//             localStorage.setItem('jwtToken', token)
//             // Set token to Auth header
//             setAuthToken(token)
//             // Decode token to get user data
//             const decoded = jwt_decode(token)
//             // Set current user
//             dispatch(setCurrentUser(decoded))
//         } 
//         catch (err) {
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             })
//         }
//     }
// } 
    
// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}