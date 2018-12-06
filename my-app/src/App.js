import React from 'react'
import { Button } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
import { addGun, addGunAsync } from './redux.js'

import { connect } from 'react-redux'

class App extends React.Component {
    render() {
        return (
            <div>
                <h2>Now we have: </h2>
                <div>{this.props.num}</div>
                <Button onClick={this.props.addGun}>Button</Button>
                <Button onClick={this.props.addGunAsync}>Async</Button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        num: state
    }
}
const actionCreators = {
    addGun,
    addGunAsync
}

App = connect(
    mapStateToProps,
    actionCreators
)(App)
export default App
