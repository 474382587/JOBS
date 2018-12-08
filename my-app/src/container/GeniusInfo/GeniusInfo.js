import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../components/AvatarSelector/AvatarSelector.js'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import Redirect from 'react-router-dom/Redirect';

class GeniusInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            desc: ''
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

                <TextareaItem onChange={v => this.onChange('desc', v)} rows="3" autoHeight title="Experience" />

                <Button type="primary" onClick={() => {this.props.update(this.state)}}>Update</Button>
            </div>
        )
    }
}

GeniusInfo = connect(
    state => state.user,
    { update }
)(GeniusInfo)

export default GeniusInfo
