import shortId from 'shortid'
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
} from '../actions/post'
import produce from 'immer'

export const initialState = {
    mainPosts: [{
        id: '1',
        User: {
            id: 1,
            nickname: 'ellsa',
        },
        content: 'first post #hashtag #frozen #ellsa',
        Images: [
            {
                src: 'https://dummyimage.com/300/ff0000/ffffff.png',
            },
            {
                src: 'https://dummyimage.com/300/9d9d9d/ffffff.png',
            },
            {
                src: 'https://dummyimage.com/300/63414d/ffffff.png',
            },
        ],
        Comments: [
            {
                User: {
                    nickname: 'anna',
                },
                content: 'Wow! you made it!',
            },
            {
                User: {
                    nickname: 'olaf',
                },
                content: 'I am melting!',
            },
        ],
    }],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: false,
    removePostLoading: false,
    removePostDone: false,
    removePostError: false,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: false,
}

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
})

export const addCommnet = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
})

const dummyPost = (data) => ({
    id: data.id,
    content: data.content,
    User: {
        id: 1,
        nickname: 'ellsa',
    },
    Images: [],
    Comments: [],
})

const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: 'ellsa',
    },
}) 

const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
    case ADD_POST_REQUEST:
        draft.addPostLoading = true
        draft.addPostDone = false
        draft.addPostError = false
        break
    case ADD_POST_SUCCESS:
        draft.addPostLoading = false
        draft.addPostDone = true
        draft.mainPosts.unshift(dummyPost(action.data))
        break
    case ADD_POST_FAILURE:
        draft.addPostLoading = false
        draft.addPostError = true
        break
    case REMOVE_POST_REQUEST:
        draft.removePostLoading = true
        draft.removePostDone = false
        draft.removePostError = false
        break
    case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false
        draft.removePostDone = true
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data)
        break
    case REMOVE_POST_FAILURE:
        draft.removePostLoading = false
        draft.removePostError = true
        break
    case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true
        draft.addCommentDone = false
        draft.addCommentError = false
        break
    case ADD_COMMENT_SUCCESS: 
        const post = draft.mainPosts.find((v) => v.id === action.data.postId)
        post.Comments.unshift(dummyComment(action.data.contetn))
        draft.addCommentLoading = false
        draft.addCommentDone = true
        break 
    case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false
        draft.addCommentError = true
        break
    default:
        break
    }
})

export default reducer
