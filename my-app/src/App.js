import React from 'react'
import { Button } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
import { addGun, addGunAsync } from './redux.js'

class App extends React.Component {
    render() {
        const store = this.props.store
        const number = store.getState()
        return (
            <div>
                <h2>Now we have: </h2>
                <div>{number}</div>
                <Button
                    onClick={() => {
                        store.dispatch(addGun())
                    }}
                >
                    Button
                </Button>
                <Button
                    onClick={() => {
                        store.dispatch(addGunAsync())
                    }}
                >
                    Async
                </Button>
            </div>
        )
    }
}

export default App
