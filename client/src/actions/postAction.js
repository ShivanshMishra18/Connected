import axios from 'axios'
import { ADD_POST, GET_ERRORS, POST_LOADING, GET_POSTS } from './types'

// Add post
export const addPost = postData => async dispatch => {

    try {
        const res = await axios.post('/api/posts', postData)
        dispatch({
            type: ADD_POST,
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


// Get posts
export const getPosts = () => async dispatch => {
    dispatch(setPostLoading())

    try {
        const res = await axios.get('/api/posts')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    }
    catch (e) {
        dispatch({
            type: GET_POSTS,
            payload: null
        })
    }
}


export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}
