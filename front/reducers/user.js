import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
    ADD_POST_TO_ME, REMOVE_POST_OF_ME
} from '../actions/user'

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
    changeNicknameLoading: false,
    changeNicknameDone: false,
    changeNicknameError: false,
    me: null,
    signupData: {},
    loginData: {},
}

export const loginRequestAction = (data) => ({
    type: LOGIN_REQUEST,
    data,
})

export const logoutRequestAction = () => ({
    type: LOGOUT_REQUEST,
})

const dummyUser = (data) => ({
    ...data,
    id: 1,
    nickname: 'ellsa',
    Posts: [{ id: 1 }],
    Follows: [{ nickname: 'jennie' }, { nickname: 'reose' }, { nickname: 'risa' }],
    Followers: [{ nickname: 'nako' }, { nickname: 'hi' }],
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case LOGIN_REQUEST:
        return {
            ...state,
            loginLoading: true,
            loginDone: false,
            loginError: false,
        }
    case LOGIN_SUCCESS:
        return {
            ...state,
            loginLoading: false,
            loginDone: true,
            me: dummyUser(action.data),
        }
    case LOGIN_FAILURE:
        return {
            ...state,
            loginLoading: false,
            loginError: action.error,
        }
    case LOGOUT_REQUEST:
        return {
            ...state,
            logoutLoading: true,
            logoutDone: false,
            logoutError: false,
        }
    case LOGOUT_SUCCESS:
        return {
            ...state,
            logoutLoading: false,
            logoutDone: true,
            me: null,
        }
    case LOGOUT_FAILURE:
        return {
            ...state,
            logoutLoading: false,
            logoutError: action.error,
        }
    case SIGNUP_REQUEST:
        return {
            ...state,
            signupLoading: true,
            signupDone: false,
            signupError: false,
        }
    case SIGNUP_SUCCESS:
        return {
            ...state,
            signupLoading: false,
            signupDone: true,
        }
    case SIGNUP_FAILURE:
        return {
            ...state,
            signupLoading: false,
            signupError: action.error,
        }
    case CHANGE_NICKNAME_REQUEST:
        return {
            ...state,
            changeNicknameLoading: true,
            changeNicknameDone: false,
            changeNicknameError: false,
        }
    case CHANGE_NICKNAME_SUCCESS:
        return {
            ...state,
            changeNicknameLoading: false,
            changeNicknameDone: true,
        }
    case CHANGE_NICKNAME_FAILURE:
        return {
            ...state,
            changeNicknameLoading: false,
            changeNicknameError: action.error,
        }
    case ADD_POST_TO_ME: 
        return {
            ...state,
            me: {
                ...state.me,
                Posts: [{ id: action.data }, ...state.me.Posts],
            },
        }
    case REMOVE_POST_OF_ME: 
        return {
            ...state,
            me: {
                ...state.me,
                Posts: state.me.Posts.filter((v) => v.id !== action.data),
            },
        }
    default:
        return state
    }
}

export default reducer
