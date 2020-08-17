export const initialState = {
    isLogginIn: false,
    isLoggedIn: false,
    isLoggingOut: false,
    me: null,
    signupData: {},
    loginData: {}
}

export const loginRequestAction = (data) => {
    return {
        type: 'LOGIN_REQUEST',
        data
    }
}

export const logoutRequestAction = () => {
    return {
        type: 'LOGOUT_REQUEST'
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN_REQUEST' :
            console.log('reducer login')
            return {
                ...state,
                isLoggingIn: true,

            }
        case 'LOGIN_SUCCESS' :
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                me: { ...action.data, nickname: 'ellsa' }
            }
        case 'LOGIN_FAILURE' :
            return {
                ...state,
                isLoggingIn: false,
            }
        case 'LOGOUT_REQUEST' :
            return {
                ...state,
                isLoggingOut: true
            }
        case 'LOGOUT_SUCCESS' :
            return {
                ...state,
                isLoggingOut: false,
                isLoggedIn: false,
                me: null
            }
        case 'LOGOUT_FAILURE' :
            return {
                ...state,
                isLoggingOut: false,
            }

        default :
            return state
        }
}

export default reducer
