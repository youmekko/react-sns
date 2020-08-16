import { createWrapper } from 'next-redux-wrapper'

import reducer from '../reducers'

import { createStore } from 'redux'

const configureStroe = () => {
    const store = createStore(reducer)
    return store
}

const wrapper = createWrapper(configureStroe, {
    debug: process.env.NODE_ENV === 'developmenet'
})

export default wrapper