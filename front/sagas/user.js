import axios from 'axios'
import {
    all, fork, delay, put, takeLatest,
} from 'redux-saga/effects'

import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
} from '../actions/user'

function signupApi() {
    return axios.post('/api/signup')
}

function loginAPI(data) {
    return axios.post('/api/login', data)
}

function logoutAPI() {
    return axios.post('/api/logout')
}

function* signup() {
    try {
        yield delay(1000)
        // const result = yield call(signupApi)
        yield put({
            type: SIGNUP_SUCCESS,
        })
    } catch (err) {
        yield put({
            type: SIGNUP_FAILURE,
            error: err.response.data,
        })
    }
}

function* login(action) {
    try {
        yield delay(1000)
        // const result = yield call(loginAPI, action.data)
        yield put({
            type: LOGIN_SUCCESS,
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: LOGIN_FAILURE,
            error: err.response.data,
        })
    }
}

function* logout() {
    try {
        yield delay(1000)
        // const result = yield call(logoutAPI)
        yield put({
            type: LOGOUT_SUCCESS,
        })
    } catch (err) {
        yield put({
            type: LOGOUT_FAILURE,
            error: err.response.data,
        })
    }
}

function* watchSignup() {
    yield takeLatest(SIGNUP_REQUEST, signup)
}

function* watchLogin() {
    yield takeLatest(LOGIN_REQUEST, login)
}

function* watchLogout() {
    yield takeLatest(LOGOUT_REQUEST, logout)
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignup),
    ])
}
