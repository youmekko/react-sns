import produce from 'immer'
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
    CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
    ADD_POST_TO_ME, REMOVE_POST_OF_ME,
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

const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
    case LOGIN_REQUEST:
        draft.loginLoading = true
        draft.loginDone = false
        draft.loginError = false
        break
    case LOGIN_SUCCESS:
        draft.loginLoading = false
        draft.loginDone = true
        draft.me = dummyUser(action.data)    
        break
    case LOGIN_FAILURE:
        draft.loginLoading = false
        draft.loginError = action.error
        break
    case LOGOUT_REQUEST:
        draft.logoutLoading = true
        draft.logoutDone = false
        draft.logoutError = false
        break
    case LOGOUT_SUCCESS:
        draft.loginDone = true
        draft.loginError = false
        break
    case LOGOUT_FAILURE:
        draft.logoutLoading = false
        draft.logoutError = action.error
        break
    case SIGNUP_REQUEST:
        draft.signupLoading = true
        draft.signupDone = false
        draft.signupError = false
        break
    case SIGNUP_SUCCESS:
        draft.signupLoading = false
        draft.signupDone = true
        break
    case SIGNUP_FAILURE:
        draft.signupLoading = false
        draft.signupError = action.error
        break
    case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true
        draft.changeNicknameDone = false
        draft.changeNicknameError = false
        break
    
    case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false
        draft.changeNicknameDone = true
        break
    case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false
        draft.changeNicknameError = action.error
        break
    case ADD_POST_TO_ME: 
        draft.me.Posts.unshift({ id: action.data })
        break
        // return {
        //     ...state,
        //     me: {
        //         ...state.me,
        //         Posts: [{ id: action.data}, ...state.me.Posts]
        //     }
        // }
    case REMOVE_POST_OF_ME: 
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data)
        break
        // return {
        //     ...state,
        //     me: {
        //         ...state.me,
        //         Posts: state.me.Postst.filter((v) => v.id !=== action.data)
        //     }
        // }
    default:
        break
    }
})

export default reducer
