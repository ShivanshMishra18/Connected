import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES } from "../actions/types"

const initialState = {
    profile: null,
    profiles: null,
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_PROFILE:
            return {
                ...state,
                loading: false,
                profile: action.payload
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            }
        default:
            return state
    }
}