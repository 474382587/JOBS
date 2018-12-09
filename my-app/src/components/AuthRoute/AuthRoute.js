import React from 'react'
import axios from 'axios'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
class AuthRoute extends React.Component {
    componentDidMount() {
        axios.get('./user/info').then(res => {
            if (res.status === 200) {
                console.log('hihihi',res.data)
                res.data.code === 0
                    ? this.props.loadData(res.data.data)
                    : this.props.history.push('/login')
            } else {
                console.log('fail with code: ', res.status)
            }
        })
    }
    render() {
        return <div />
    }
}
AuthRoute = connect(
    state => state.user,
    { loadData }
)(AuthRoute)
AuthRoute = withRouter(AuthRoute)
export default AuthRoute
