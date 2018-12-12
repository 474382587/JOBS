import React from 'react'
import axios from 'axios'
import { WingBlank, Card, WhiteSpace } from 'antd-mobile'
import CardBody from 'antd-mobile/lib/card/CardBody'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'

class Boss extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {
        this.props.getUserList('genius')
    }
    handleClick(el){
        this.props.history.push(`/chat/${el._id}`)
    }
    render() {
        return (
            <WingBlank>
            {console.log(this.props)}
                {this.props.userList.map(e => {
                    return e.avatar ? (
                        <div key={e._id}>
                            <WhiteSpace />
                            <Card 
                                onClick={() => this.handleClick(e)}
                            >
                                <Card.Header
                                    title={e.user}
                                    thumb={require(`../../components/img/${
                                        e.avatar
                                    }.png`)}
                                    extra={<span>{e.title}</span>}
                                />
                                <CardBody>
                                    {e.desc.split('\n').map(el => {
                                        return (
                                            <p key={el + Math.random()}>{el}</p>
                                        )
                                    })}
                                </CardBody>
                            </Card>
                        </div>
                    ) : (
                        ''
                    )
                })}
            </WingBlank>
        )
    }
}
Boss = connect(
    state => state.chatUser,
    { getUserList }
)(Boss)
export default Boss
