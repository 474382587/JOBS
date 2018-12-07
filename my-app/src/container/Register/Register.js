import React from 'react'
import Logo from '../../components/Logo/Logo'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import {
    List,
    InputItem,
    WingBlank,
    WhiteSpace,
    Button,
    Radio
} from 'antd-mobile'

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
        this.handleRegister = this.handleRegister.bind(this)
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    login() {
        this.props.history.push('./login')
    }
    handleRegister() {
        this.props.register(this.state)
        console.log('Register')
        console.log(this.props)
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo ? (
                    <Redirect to={this.props.redirectTo} />
                ) : (
                    ''
                )}
                <Logo />
                <h2 style={{ textAlign: 'center' }}>Register</h2>
                <WingBlank>
                    <List>
                        {this.props.msg ? (
                            <p className="error-msg"> {this.props.msg}</p>
                        ) : (
                            ''
                        )}
                        <InputItem onChange={v => this.handleChange('user', v)}>
                            Username
                        </InputItem>
                        <WhiteSpace style={{ backgroundColor: '#f5f5f9' }} />
                        <InputItem
                            type="password"
                            onChange={v => this.handleChange('pwd', v)}
                        >
                            Password
                        </InputItem>
                        <WhiteSpace style={{ backgroundColor: '#f5f5f9' }} />
                        <InputItem
                            type="password"
                            onChange={v => this.handleChange('repeatpwd', v)}
                        >
                            Confirm
                        </InputItem>
                        <WhiteSpace style={{ backgroundColor: '#f5f5f9' }} />
                        <RadioItem
                            onChange={v => this.handleChange('type', 'genius')}
                            checked={this.state.type === 'genius'}
                        >
                            Employee
                        </RadioItem>
                        <WhiteSpace style={{ backgroundColor: '#f5f5f9' }} />
                        <RadioItem
                            onChange={v => this.handleChange('type', 'boss')}
                            checked={this.state.type === 'boss'}
                        >
                            Employer
                        </RadioItem>
                        <WhiteSpace style={{ backgroundColor: '#f5f5f9' }} />
                    </List>
                    <Button onClick={this.login} type="primary">
                        Login
                    </Button>
                    <WhiteSpace />
                    <Button onClick={this.handleRegister} type="primary">
                        Register
                    </Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => state.user,
    { register }
)(Register)
