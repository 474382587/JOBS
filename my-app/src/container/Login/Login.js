import React from 'react'
import Logo from '../../components/Logo/Logo'
import SubmitForm from '../../components/SubmitForm/SubmitForm'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { login } from '../../redux/user.redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
        // this.state = {
        //     user: '',
        //     pwd: ''
        // }
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleLogin() {
        this.props.login(this.props.state)
    }
    // handleChange(key, val) {
    //     this.setState({
    //         [key]: val
    //     })
    // }
    register() {
        this.props.history.push('./register')
    }
    render() {
        return (
            <div>
                {this.props.redirectTo && this.props.redirectTo !== '/login' ? (
                    <Redirect to={this.props.redirectTo} />
                ) : (
                    ''
                )}
                <Logo />
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                <WingBlank>
                    <List>
                        {this.props.msg ? (
                            <p className="error-msg"> {this.props.msg}</p>
                        ) : (
                            ''
                        )}
                        <InputItem onChange={v => this.props.handleChange('user', v)}>
                            Username
                        </InputItem>
                        <WhiteSpace style={{ backgroundColor: '#f5f5f9' }} />
                        <InputItem
                            type="password"
                            onChange={v => this.props.handleChange('pwd', v)}
                        >
                            Password
                        </InputItem>
                        <WhiteSpace style={{ backgroundColor: '#f5f5f9' }} />
                    </List>
                    <Button onClick={this.handleLogin} type="primary">
                        Login
                    </Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type="primary">
                        Register
                    </Button>
                </WingBlank>
            </div>
        )
    }
}
Login = connect(
    state => state.user,
    { login }
)(Login)

Login = SubmitForm(Login)
export default Login
