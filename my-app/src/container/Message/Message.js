import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

class Msg extends React.Component {
    getLast(arr) {
        return arr[arr.length - 1]
    }
    render() {
        // if(!this.props.chat.chatmsg.length) {
        //     return
        // }

        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.user._id
        const userinfo = this.props.chat.users
        // console.log(this.props)
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(e => {
            msgGroup[e.chatid] = msgGroup[e.chatid] || []
            msgGroup[e.chatid].push(e)
        })
        // console.table(msgGroup)
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        })
        console.log(chatList)
        return (
            <div>
                <List>
                    {chatList.map(e => {
                        const lastItem = this.getLast(e)
                        const targetId =
                            e[0].from === userid ? e[0].to : e[0].from
                        const name =
                            userinfo[targetId] && userinfo[targetId].name
                        const avatar =
                            userinfo[targetId] && userinfo[targetId].avatar
                                ? userinfo[targetId].avatar
                                : 'zebra'
                        const unreadNum = e.filter(e => {
                            return !e.read && e.to === userid
                        }).length
                        return (
                            <Item
                                arrow="horizontal"
                                onClick={() => {
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                                extra={<Badge text={unreadNum} />}
                                key={lastItem._id}
                                thumb={require('../../components/img/' +
                                    avatar +
                                    '.png')}
                            >
                                {lastItem.content}
                                <Brief>{name}</Brief>
                            </Item>
                        )
                    })}
                </List>
            </div>
        )
    }
}

Msg = connect(
    state => state,
    {}
)(Msg)

export default Msg
