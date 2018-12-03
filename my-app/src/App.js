import React from 'react'
// import { createStore } from 'redux'
import axios from 'axios'



const App = (props) => {
    const store = props.store
    const ADD = props.ADD
    const REMOVE = props.REMOVE
    const currentState = store.getState()
    return (
        <div>
            This is my React!
            {currentState}
            <button onClick={() => {
                console.log(ADD)
                store.dispatch(ADD())
            }}>ADD</button>
            <button onClick={() => {
                store.dispatch(REMOVE())
            }}>REMOVE</button>
            <button onClick={() => {
                axios.get('http://localhost:9093/data').then(res => {
                    console.dir(res.data)
                    console.table(res.data)
                })
            }}>Axios</button>
        </div>
    )


}

export default App