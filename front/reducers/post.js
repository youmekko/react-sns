import shortId from 'shortid'
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
} from '../actions/post'

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

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case ADD_POST_REQUEST:
        return {
            ...state,
            addPostLoading: true,
            addPostDone: false,
            addPostError: false,
        }
    case ADD_POST_SUCCESS:
        return {
            ...state,
            mainPosts: [dummyPost(action.data), ...state.mainPosts],
            addPostLoading: false,
            addPostDone: true,
        }
    case ADD_POST_FAILURE:
        return {
            ...state,
            addPostLoading: false,
            addPostError: true,
        }
    case REMOVE_POST_REQUEST:
        return {
            ...state,
            removePostLoading: true,
            removePostDone: false,
            removePostError: false,
        }
    case REMOVE_POST_SUCCESS:
        return {
            ...state,
            mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
            removePostLoading: false,
            removePostDone: true,
        }
    case REMOVE_POST_FAILURE:
        return {
            ...state,
            removePostLoading: false,
            removePostError: true,
        }
    case ADD_COMMENT_REQUEST:
        return {
            ...state,
            addCommentLoading: true,
            addCommentDone: false,
            addCommentError: false,
        }
    case ADD_COMMENT_SUCCESS: {
        const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId)
        const post = { ...state.mainPosts[postIndex] }
        post.Comments = [dummyComment(action.data.content), ...post.Comments]
        const mainPosts = [...state.mainPosts]
        mainPosts[postIndex] = post
        return {
            ...state,
            mainPosts,
            addCommentLoading: false,
            addCommentDone: true,
        }
    }
    case ADD_COMMENT_FAILURE:
        return {
            ...state,
            addCommentLoading: false,
            addCommentError: true,
        }
    default:
        return state
    }
}

export default reducer
