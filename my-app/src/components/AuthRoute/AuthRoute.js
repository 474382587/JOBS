import React from 'react'
import axios from 'axios'

class AuthRoute extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        axios.get('./user/info').then(res => {
            if(res.status === 200) {
                console.log(res.data)
            }
            else {
                console.log('fail with code: ', res.status)
            }
        })
    }
    render() {
        return (<div>Check if Login</div>)
    }
}
export default AuthRoute