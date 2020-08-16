import { createWrapper } from 'next-redux-wrapper'
import reducer from '../reducers'
import { createStore, compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const configureStroe = () => {
    const middlewares = []
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer, enhancer)
    return store
}

const wrapper = createWrapper(configureStroe, {
    debug: process.env.NODE_ENV === 'developmenet'
})

export default wrapper