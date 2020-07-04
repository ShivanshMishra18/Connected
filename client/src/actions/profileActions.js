import axios from 'axios'
import { PROFILE_LOADING, GET_PROFILE } from './types'

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