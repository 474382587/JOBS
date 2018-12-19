import React from 'react'
import { List, InputItem, NavBar } from 'antd-mobile'

import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

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
        const from = this.props.user._id;
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
        this.props.getMsgList()
        this.props.recvMsg()
        // socket.on(
        //     'recvMsg',
        //     function(data) {
        //         this.setState({
        //             msg: [...this.state.msg, data.text]
        //         })
        //     }.bind(this)
        // )
    }
    render() {
        const user = this.props.match.params.user
        const Item = List.Item
        return (
            <div id="chat-page">
                <NavBar mode="dark">
                    {this.props.match.params.user}
                </NavBar>
                {this.props.chat.chatmsg.map(v => {
                    return v.from === user ? (
                        <List key={v._id}>
                            <Item 
                            // thumb={}
                            >
                                {v.content}
                            </Item>
                        </List>
                    ) : (
                        <List key={v._id}>
                            <Item
                            extra={'avatar'}
                            className="chat-me">
                                {v.content}
                            </Item>
                        </List>
                    )
                    // return <p key={v._id}>{v.content}</p>
                })}
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
