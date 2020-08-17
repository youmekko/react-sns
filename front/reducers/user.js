import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/user'

export const initialState = {
    loginLoading: false,
    loginDone: false,
    loginError: null,
    logoutLoading: false,
    logoutDone: false,
    logoutError: false,
    signupLoading: false,
    signupDone: false,
    signupError: false,
    me: null,
    signupData: {},
    loginData: {}
}


export const loginRequestAction = (data) => {
    return {
        type: LOGIN_REQUEST,
        data
    }
}

export const logoutRequestAction = () => {
    return {
        type: LOGOUT_REQUEST
    }
}

const dummyUser = (data) => ({
    ...data,
    id: 1,
    nickname: 'ellsa',
    Posts: [],
    Follows: [],
    Followers: []
})

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_REQUEST :
            console.log('reducer login')
            return {
                ...state,
                loginLoading: true,
                loginDone: false,
                loginError: false
            }
        case LOGIN_SUCCESS :
            return {
                ...state,
                loginLoading: false,
                loginDone: true,
                me: dummyUser(action.data)
            }
        case LOGIN_FAILURE :
            return {
                ...state,
                loginLoading: false,
                loginError: action.error,
            }
        case LOGOUT_REQUEST :
            return {
                ...state,
                logoutLoading: true,
                logoutDone: false,
                logoutError: false
            }
        case LOGOUT_SUCCESS :
            return {
                ...state,
                logoutLoading: false,
                logoutDone: true,
                me: null
            }
        case LOGOUT_FAILURE :
            return {
                ...state,
                logoutLoading: false,
                logoutError: action.error
            }
        case SIGNUP_REQUEST :
            return {
                ...state,
                signupLoading: true,
                signupDone: false,
                signupError: false
            }
        case SIGNUP_SUCCESS :
            return {
                ...state,
                signupLoading: false,
                signupDone: true,
            }
        case SIGNUP_FAILURE :
            return {
                ...state,
                signupLoading: false,
                signupError: action.error
            }

        default :
            return state
        }
}

export default reducer
