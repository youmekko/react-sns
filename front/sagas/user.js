import { all, fork, delay, put, takeLatest } from 'redux-saga/effects'

function loginAPI (data) {
    return axios.post('/api/login', data)
}

function* login (action) { 
    try {
        console.log('saga login')
        yield delay(1000)
        // const result = yield call(loginAPI, action.data)
        yield put({
            type: 'LOGIN_SUCCESS',
            data: action.data
        })
    } catch (err) {
        yield put({
            type: 'LOGIN_SUCCESS',
            data: err.response.data
        })
    }
}

function* watchLogin () {
    yield takeLatest('LOGIN_REQUEST', login)   
}


function logoutAPI () {
    return axios.post('/api/logout')
}

function* logout () { 
    try {
        yield delay(1000)
        // const result = yield call(logoutAPI)
        yield put({
            type: 'LOGOUT_SUCCESS',
        })
    } catch (err) {
        yield put({
            type: 'LOGOUTSUCCESS',
            data: err.response.data
        })
    }
}


function* watchLogout () {
    yield takeLatest('LOGOUT_REQUEST', logout)
}


export default function* userSaga () {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
    ])
}