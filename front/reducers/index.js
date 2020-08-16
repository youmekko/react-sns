import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
    user: {
        isLoggedIn: false,
        user: null,
        signupData: {},
        loginData: {}
    },
    post: {
        mainPosts: []
    }
}

export const loginAction = (data) => {
    return {
        type: 'LOGIN',
        data
    }
}

export const logoutAction = () => {
    return {
        type: 'LOGOUT'
    }
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case HYDRATE: 
            return { ...stete, ...action.payload}

        case 'LOGIN' :
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: true,
                    user: action.data
                }
            }
        case 'LOGOUT' :
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: false,
                    user: null
                }
            }

        default :
            return state
    }
}

export default rootReducer