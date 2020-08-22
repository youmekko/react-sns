import axios from 'axios'
import {
    all, fork, delay, put, takeLatest,
} from 'redux-saga/effects'

import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
} from '../actions/post'

function addPostAPI(data) {
    return axios.post('/api/addPost', data)
}

function* addPost(action) {
    try {
        yield delay(1000)
        // const result  = yield call(addPostAPI, action.data)
        yield put({
            type: ADD_POST_SUCCESS,
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

function addCommentAPI(data) {
    return axios.post(`/api/post/${data.postId}/comment`, data)
}

function* addComment(action) {
    try {
        yield delay(1000)
        // const result  = yield call(addPostAPI, action.data)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data,
        })
    }
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
    ])
}
