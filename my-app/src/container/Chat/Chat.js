import React from 'react'

class Chat extends React.Component {
    render() {
        console.log(this.props)

        return <div>Chat with user: {this.props.match}</div>
    }
}

export default Chat
