export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'ellsa'
        },
        content: 'first post #hashtag #frozen #ellsa',
        Images: [
            {
                src: ''
            },
            {
                src: ''
            },
            {
                src: ''
            },
        ],
        Comments: [
            {
                User: {
                    nickname: 'anna'
                },
                content: 'Wow! you made it!'
            },
            {
                User: {
                    nickname: 'olaf'
                },
                content: 'I am melting!'
            },
        ]
    }],
    imagePaths: [],
    postAdded: false
}

const ADD_POST = 'ADD_POST'

export const addPost = {
    type: ADD_POST
}

const dummyPost = {
    id: 2,
    content: 'this is dummy post',
    User: {
        id: 1,
        nickname: 'ellsa'
    },
    Images: [],
    Commnets: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST :
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts], 
                postAdded: true
            }
        default :
            return state
        }
}

export default reducer
