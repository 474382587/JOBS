import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
// import 'antd-mobile/dist/antd-mobile.css';
// import 'antd-mobile/lib/tab-bar/style/index.css';
import { withRouter } from 'react-router'

class NavLink extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render() {
        const navList = this.props.data.filter(v => !v.hide)
        const pathname = this.props.location.pathname
        console.log(pathname)
        return (
            <TabBar>
                {navList.map(e => {
                    return (
                        <TabBar.Item
                            key={e.path}
                            icon={{ uri: require(`./img/${e.icon}.png`) }}
                            title={e.text}
                            selectedIcon={{
                                uri: require(`./img/${e.icon}-active.png`)
                            }}
                            selected={pathname === e.path}
                            onPress={()=> {
                                this.props.history.push(e.path)
                            }}
                        />
                    )
                })}
            </TabBar>
        )
    }
}
NavLink = withRouter(NavLink)
export default NavLink
