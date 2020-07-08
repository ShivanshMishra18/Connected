import axios from 'axios'
import { PROFILE_LOADING, GET_PROFILE, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, GET_PROFILES } from './types'

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


// Delete account and profile
export const deleteAccount = () => async dispatch => {
    if (!window.confirm('Are you sure you want to delete your account?'))
        return
    
    try {
        await axios.delete('/api/profile')
        dispatch({
            type: SET_CURRENT_USER,
            payload: {}
        })
    }
    catch (e) {
        dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        })
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


// Add experience 
export const addExperience = (expData, history) => async dispatch => {

    try {
        await axios.post('api/profile/experience', expData)
        history.push('/dashboard')
    }
    catch (e) {
        dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        })
    }
}

// Add education 
export const addEducation = (eduData, history) => async dispatch => {

    try {
        await axios.post('api/profile/education', eduData)
        history.push('/dashboard')
    }
    catch (e) {
        dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        })
    }
}


// Delete experience 
export const deleteExperience = expId => async dispatch => {

    try {
        const res = await axios.delete(`api/profile/experience/${expId}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        })
    }
}


// Delete education 
export const deleteEducation = eduId => async dispatch => {

    try {
        const res = await axios.delete(`api/profile/education/${eduId}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: GET_ERRORS,
            payload: e.response.data
        })
    }
}


// Get all profiles
export const getProfiles = () => async dispatch => {
    dispatch(setProfileLoading())

    try {
        const res = await axios.get('/api/profile/all')
        dispatch({ 
            type: GET_PROFILES,
            payload: res.data
        })
    } 
    catch (e) {
        dispatch({ 
            type: GET_PROFILES,
            payload: null
        })
    }
} 