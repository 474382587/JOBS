import React from 'react'
import { Card, WhiteSpace } from 'antd-mobile'
import CardBody from 'antd-mobile/lib/card/CardBody'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
class UserCard extends React.Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired
    }
    render() {
        const {
            id,
            user,
            avatar,
            desc,
            title,
            type,
            salary,
            company
        } = this.props.userInfo
        return (
            <div key={id}>
                <WhiteSpace />
                <Card onClick={() => this.props.handleClick(user)}>
                    <Card.Header
                        title={user}
                        thumb={require(`../../components/img/${avatar}.png`)}
                        extra={<span>{title}</span>}
                    />
                    <CardBody>
                        {type === 'boss' ? (
                            <div>
                                Company: {company}
                                <br />
                                Salary: {salary}
                            </div>
                        ) : (
                            ''
                        )}
                        {desc
                            ? desc.split('\n').map(el => {
                                  return <p key={el + Math.random()}>{el}</p>
                              })
                            : ''}
                    </CardBody>
                </Card>
            </div>
        )
    }
}
UserCard = withRouter(UserCard)
export default UserCard
