import { createWrapper } from 'next-redux-wrapper'
import reducer from '../reducers'
import rootSaga from '../sagas'
import { createStore, compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

const loggerMiddleware = ({dispatch, getState}) => (next) => (action) => {
    console.log(action)
    return next(action)
}


const configureStroe = () => {
    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [sagaMiddleware, loggerMiddleware]
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares))
    const store = createStore(reducer, enhancer)
    store.sagaTask = sagaMiddleware.run(rootSaga)
    return store
}

const wrapper = createWrapper(configureStroe, {
    debug: process.env.NODE_ENV === 'developmenet'
})

export default wrapper