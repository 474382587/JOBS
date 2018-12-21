import React from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'

import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'
// import io from 'socket.io-client'
// const socket = io('ws://localhost:9093')

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    state = {}

    handleSubmit() {
        // socket.emit('sendMsg', { text: this.state.text })
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.setState({ text: '' })

        console.log({
            from,
            to,
            msg
        })
        this.props.sendMsg({
            from,
            to,
            msg
        })
    }
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    render() {
        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        console.log(users)
        console.log('userid ', userid)
        console.dir(users[userid])
        if (!users[userid]) {
            return null
        }
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v => {
            return v.chatid === chatid
        })
        return (
            <div id="chat-page">
                <NavBar
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                    mode="dark"
                    style={{ zIndex: 10 }}
                >
                    {users[userid].name}
                </NavBar>
                <div style={{ paddingBottom: 45 }} />
                {chatmsgs.map(v => {
                    const avatar = require(`../../components/img/${
                        users[v.from].avatar
                    }.png`)
                    return v.from === userid ? (
                        <List key={v._id}>
                            <Item thumb={avatar}>{v.content}</Item>
                        </List>
                    ) : (
                        <List key={v._id}>
                            <Item
                                extra={<img src={avatar} alt="to" />}
                                className="chat-me"
                            >
                                {v.content}
                            </Item>
                        </List>
                    )
                })}
                <div style={{ paddingBottom: 45 }} />
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="Please enter"
                            value={this.state.text}
                            onChange={v => {
                                this.setState({
                                    text: v
                                })
                            }}
                            extra={
                                <span
                                    onClick={() => {
                                        this.handleSubmit()
                                    }}
                                >
                                    Submit
                                </span>
                            }
                        />
                    </List>
                </div>
            </div>
        )
    }
}
Chat = connect(
    state => state,
    {
        getMsgList,
        sendMsg,
        recvMsg
    }
)(Chat)
export default Chat
