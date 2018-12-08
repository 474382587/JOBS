import React from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
    static PropTypes = {
        selectAvatar: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(v => ({
                icon: require(`../img/${v}.png`),
                text: v
            }))
        const gridHeader = this.state.icon ? (
            <div>
                <span>Your Avatar: </span>
                <img style={{ width: 13.2, marginLeft: 10 }} src={this.state.icon} alt="" />
            </div>
        ) : (
            'Choose Your Avatar: '
        )
        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={el => {
                            this.setState(el)
                            this.props.selectAvatar(el.text)
                        }}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelector
