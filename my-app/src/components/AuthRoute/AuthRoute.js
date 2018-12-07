import React from 'react'
import axios from 'axios'
import { loadData } from "../../redux/user.redux"
import { connect } from 'react-redux'


class AuthRoute extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        axios.get('./user/info').then(res => {
            if(res.status === 200) {
                console.log(res.data)
                this.props.loadData(res.data.data)
            }
            else {
                console.log('fail with code: ', res.status)
            }
        })
    }
    render() {
        return (<div></div>)
    }
}
AuthRoute = connect(state => state.user ,{loadData})(AuthRoute)
export default AuthRoute