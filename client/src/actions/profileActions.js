import axios from 'axios'
import { PROFILE_LOADING, GET_PROFILE, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './types'

// Get current profile
export const getCurrentProfile = () => async dispatch => {
    dispatch(setProfileLoading())

    try {
        const res = await axios.get('/api/profile')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }
    catch {
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    }
}


// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}


// Clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}


// Create profile
export const createProfile = (profileData, history) => async dispatch => {

    try {
        await axios.post('/api/profile', profileData)
        history.push('/dashboard')
    } 
    catch (e) {
        dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        })
    }
}