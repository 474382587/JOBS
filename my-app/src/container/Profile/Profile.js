import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logoutSubmit } from '../../redux/user.redux'
import { Button, Result, List, WhiteSpace, Modal } from 'antd-mobile'
import { Brief } from 'antd-mobile/lib/list/ListItem'
import BrowserCookie from 'browser-cookies'
class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout() {
        const alert = Modal.alert
        alert('Logout', 'Logout now?', [
            {
                text: 'No',
                onPress: () => {
                    console.log('Nope')
                }
            },
            {
                text: 'Yes',
                onPress: () => {
                    // BrowserCookie.erase('userid')
                    this.props.logoutSubmit()
                }
            }
        ])
        // BrowserCookie.erase('userid')
        // window.location.href = window.location.href
    }
    render() {
        console.log(this.props)
        return this.props.user ? (
            <div>
                <Result
                    message={
                        this.props.type === 'boss'
                            ? this.props.company
                            : 'Looking for Job'
                    }
                    title={this.props.title}
                    img={
                        this.props.avatar ? (
                            <img
                                style={{ width: 60 }}
                                src={require(`../../components/img/${
                                    this.props.avatar
                                }.png`)}
                                alt=""
                            />
                        ) : (
                            ''
                        )
                    }
                />
                <List renderHeader={() => 'Profile'}>
                    <List.Item wrap="true">
                        {this.props.title ? this.props.title : 'Not Sure'}
                        <Brief>
                            {this.props.desc
                                ? this.props.desc.split('\n').map(e => {
                                      return <p key={e}>{e}</p>
                                  })
                                : 'Nothing'}
                        </Brief>
                        {this.props.salary ? (
                            <Brief>Salary: {this.props.salary}</Brief>
                        ) : (
                            ''
                        )}
                    </List.Item>
                </List>
                <WhiteSpace />
                <List>
                    <List.Item>
                        <Button onClick={this.logout} type="primary">
                            Logout
                        </Button>
                    </List.Item>
                </List>
            </div>
        ) : this.props.redirectTo ? (
            <Redirect to={this.props.redirectTo} />
        ) : (
            ''
        )
    }
}

// Redux
Profile = connect(
    state => state.user,
    { logoutSubmit }
)(Profile)
export default Profile
