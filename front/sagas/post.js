import axios from 'axios'
import {
    all, fork, delay, put, takeLatest,
} from 'redux-saga/effects'

import shortId from 'shortid'
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
} from '../actions/post'

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../actions/user'

function addPostAPI(data) {
    return axios.post('/api/addPost', data)
}

function removePostAPI(data) {
    return axios.delete('/api/removePost', data)
}

function addCommentAPI(data) {
    return axios.post(`/api/post/${data.postId}/comment`, data)
}

function* addPost(action) {
    try {
        yield delay(1000)
        // const result  = yield call(addPostAPI, action.data)
        const id = shortId.generate()
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                id,
                content: action.data,
            },
        })
        yield put({
            type: ADD_POST_TO_ME,
            data: id,
        })
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function* removePost(action) {
    try {
        yield delay(1000)
        // const result  = yield call(addPostAPI, action.data)
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data,
        })
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: REMOVE_POST_FAILURE,
            error: err.response.data,
        })
    }
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

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost)
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
    ])
}
