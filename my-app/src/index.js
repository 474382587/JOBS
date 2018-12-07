import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import './app.css'

import reducer from './reducer.js'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link, Router } from 'react-router-dom'

// axios interceptors
import './config.js'

import Register from './container/Register/Register'
import Login from './container/Login/Login'
import AuthRoute from './components/AuthRoute/AuthRoute'

const reduxDevTools = window.devToolsExtension
    ? window.devToolsExtension()
    : ''
const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        reduxDevTools
    )
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
