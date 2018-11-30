import React from 'react'
// import { createStore } from 'redux'




const App = (props) => {
    const store = props.store
    const ADD = props.ADD
    const REMOVE = props.REMOVE
    const currentState = store.getState()
    return (
        <div>
            This is my React!
            {currentState}
            <button onClick={()=>{
                console.log(ADD)
                store.dispatch(ADD())
            }}>ADD</button>
            <button onClick={()=>{
                store.dispatch(REMOVE())
            }}>REMOVE</button>
        </div>
    )


}

export default App