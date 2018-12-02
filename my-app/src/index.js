import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { createStore, applyMiddleapplyMiddleware, applyMiddleware } from 'redux'
// import  thunk  from 'redux-thunk'


// here is my reducer 
// function calculate(state = 0, action) {
//     switch (action.type) {
//         case 'ADD':
//             return state + 1
//         case 'REMOVE':
//             return state - 1
//         default:
//             return state
//     }
// }

// const ADD = function () {
//     return {
//         type: 'ADD'
//     }
// }
// const REMOVE = function () {
//     return {
//         type: 'REMOVE'
//     }
// }
// const addNumAsync = function() {
//     return dispatch => {
        
//     }
// }


// const store = createStore(calculate, applyMiddleware(thunk))



// function render() {
//     ReactDOM.render(<App store={store} ADD={ADD} REMOVE={REMOVE} />, document.getElementById('root'));
// }
// render()

// store.subscribe(render)


ReactDOM.render(<App />, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();



