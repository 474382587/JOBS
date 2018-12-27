import React from 'react'
import { connect } from 'react-redux'

class Msg extends React.Component {
    render() {
        console.log(this.props)
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(e => {
            msgGroup[e.chatid] = msgGroup[e.chatid] || []
            msgGroup[e.chatid].push(e)
        })
        console.table(msgGroup)
        return <div>Message Center</div>
    }
}

Msg = connect(
    state => state,
    {}
)(Msg)

export default Msg
