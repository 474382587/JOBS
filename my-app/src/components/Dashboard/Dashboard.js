import React from 'react'
import { Route } from 'react-router-dom'
import Boss from '../../container/Boss/Boss'
import Genius from '../../container/Genius/Genius'
import { connect } from 'react-redux'
import Message from '../../container/Message/Message'
import Profile from '../../container/Profile/Profile'
import '../../app.css'
import { NavBar } from 'antd-mobile'
import { Switch } from 'react-router-dom'
import NavLink from '../../components/NavLink/NavLink'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
// import Msg from '../Msg/Msg'

class Dashboard extends React.Component {
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    render() {
        const { pathname } = this.props.location
        const user = this.props.user
        const navList = [
            {
                path: '/boss',
                text: 'Talent',
                icon: 'boss',
                title: 'All Talents',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'Jobs',
                icon: 'job',
                title: 'All Jobs',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: 'Message',
                icon: 'message',
                title: 'All Message',
                component: Message
            },
            {
                path: '/me',
                text: 'Me',
                icon: 'user',
                title: 'Me',
                component: Profile
            }
        ]
        return (
            <div>
                <NavBar className="fixed-header " mode="dark">
                    {navList.find(v => v.path === pathname).title}
                </NavBar>
                <div style={{ marginTop: 45 }}>
                    <Switch>
                        {navList.map(e => {
                            return (
                                <Route
                                    key={e.path}
                                    path={e.path}
                                    component={e.component}
                                />
                            )
                        })}
                    </Switch>
                </div>
                <NavLink data={navList} />
            </div>
        )
    }
}

Dashboard = connect(
    state => state,
    { getMsgList, sendMsg, recvMsg }
)(Dashboard)

export default Dashboard
