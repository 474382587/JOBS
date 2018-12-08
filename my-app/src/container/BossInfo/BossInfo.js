import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../components/AvatarSelector/AvatarSelector.js'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import Redirect from 'react-router-dom/Redirect';

class BossInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            avatar: ''
        }
        this.onChange = this.onChange.bind(this)
        this.selectAvatar = this.selectAvatar.bind(this)
    }
    selectAvatar(data) {
        this.setState({
            avatar: data
        })
    }
    onChange(key, value) {
        this.setState({
            [key]: value
        })
    }
    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={redirect}></Redirect>: ''}
                <NavBar mode="dark">Complete Profile</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar} />

                <InputItem onChange={v => this.onChange('title', v)}>
                    Position
                </InputItem>

                <InputItem onChange={v => this.onChange('company', v)}>
                    Company
                </InputItem>

                <InputItem onChange={v => this.onChange('salary', v)}>
                    Salary
                </InputItem>

                <TextareaItem rows="3" autoHeight title="Job Description" />

                <Button type="primary" onClick={() => {this.props.update(this.state)}}>Update</Button>
            </div>
        )
    }
}

BossInfo = connect(
    state => state.user,
    { update }
)(BossInfo)

export default BossInfo
