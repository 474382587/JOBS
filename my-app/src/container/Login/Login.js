import React from 'react'
import Logo from '../../components/Logo/Logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
    }
    register() {
        this.props.history.push('./register')
    }
    render() {
        return (
            <div>
                <Logo></Logo>
                <h2 style={{ "textAlign": "center" }}>Login</h2>
                <WingBlank>
                    <List>
                        <InputItem>Username</InputItem>
                        <WhiteSpace style={{backgroundColor:"#f5f5f9"}}></WhiteSpace>
                        <InputItem>Password</InputItem>
                        <WhiteSpace style={{backgroundColor:"#f5f5f9"}}></WhiteSpace>
                    </List>
                    <Button type='primary'>Login</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register} type='primary'>Register</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login