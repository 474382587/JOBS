import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'

import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
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
        this.setState({ text: '', showEmoji: false })

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
    componentWillUnmount() {
        const to = this.props.match.params.user
        console.log(to)
        this.props.readMsg(to)
    }
    fixCarousel() {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }
    render() {
        const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠'
            .split(' ')
            .filter(e => e)
            .map(e => {
                return {
                    text: e
                }
            })

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
                                <div>
                                    <span
                                        onClick={() => {
                                            this.setState({
                                                showEmoji: !this.state.showEmoji
                                            })
                                            this.fixCarousel()
                                        }}
                                        role="img"
                                        aria-label="smile"
                                        style={{
                                            marginRight: '15px',
                                            lineHeight: 1.2
                                        }}
                                    >
                                        😃
                                    </span>
                                    <span
                                        onClick={() => {
                                            this.handleSubmit()
                                        }}
                                    >
                                        Submit
                                    </span>
                                </div>
                            }
                        />
                    </List>
                    {this.state.showEmoji ? (
                        <Grid
                            data={emoji}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={el => {
                                console.log(el)
                                this.setState({
                                    text: this.state.text + el.text
                                })
                            }}
                        />
                    ) : (
                        ''
                    )}
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
        recvMsg,
        readMsg
    }
)(Chat)
export default Chat
