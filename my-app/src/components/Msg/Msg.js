import React from 'react'
import { connect } from 'react-redux'

class Msg extends React.Component {
    render() {
        return (
            <div>
                Message Center
            </div>
        )
    }
}

Msg = connect(state=>state,{})(Msg)

export default Msg
