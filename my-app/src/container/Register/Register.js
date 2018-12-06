import React from 'react'
import Logo from '../../components/Logo/Logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from "antd-mobile";
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        }
        this.login = this.login.bind(this)
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    login() {
        this.props.history.push('./login')
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                <Logo></Logo>
                <h2 style={{ "textAlign": "center" }}>Register</h2>
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.handleChange('user', v)} >Username</InputItem>
                        <WhiteSpace style={{ backgroundColor: "#f5f5f9" }}></WhiteSpace>
                        <InputItem onChange={v => this.handleChange('pwd', v)} >Password</InputItem>
                        <WhiteSpace style={{ backgroundColor: "#f5f5f9" }}></WhiteSpace>
                        <InputItem onChange={v => this.handleChange('repeatpwd', v)}>Confirm Password</InputItem>
                        <WhiteSpace style={{ backgroundColor: "#f5f5f9" }}></WhiteSpace>
                        <RadioItem onChange={v => this.handleChange('type', 'genius')} checked={this.state.type === 'genius'}>Employee</RadioItem>
                        <WhiteSpace style={{ backgroundColor: "#f5f5f9" }}></WhiteSpace>
                        <RadioItem onChange={v => this.handleChange('type', 'boss')} checked={this.state.type === 'boss'}>Employer</RadioItem>
                        <WhiteSpace style={{ backgroundColor: "#f5f5f9" }}></WhiteSpace>
                    </List>
                    <Button onClick={this.login} type='primary'>Login</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button type='primary'>Register</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register