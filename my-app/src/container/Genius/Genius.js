import React from 'react'
import { WingBlank, Card, WhiteSpace } from 'antd-mobile'
import CardBody from 'antd-mobile/lib/card/CardBody'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../../components/UserCard/UserCard'
class Genius extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {
        this.props.getUserList('boss')
    }
    handleClick(user) {
        this.props.history.push(`/chat/${user}`)
    }
    render() {
        return (
            <WingBlank>
                {console.log(this.props)}
                {this.props.userList.map(e => {
                    return e.avatar ? (
                        <UserCard
                            handleClick = {this.handleClick}
                            key={e._id}
                            userInfo={{
                                id: e._id,
                                user: e.user,
                                avatar: e.avatar,
                                desc: e.desc,
                                title: e.titlem,
                                type: e.type,
                                salary: e.salary,
                                company: e.company
                            }}
                        />
                    ) : (
                        ''
                    )
                })}
            </WingBlank>
        )
    }
}
Genius = connect(
    state => state.chatUser,
    { getUserList }
)(Genius)
export default Genius
// import React from 'react'

// class Genius extends React.Component {
//     render() {
//         return <div>This is Genius</div>
//     }
// }

// export default Genius
