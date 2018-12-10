import React from 'react'
export default function SubmitForm(Comp) {
    return class WrapperComponent extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                user: '',
                pwd: '',
                repeatpwd: '',
                type: 'genius'
            }
            this.handleChange = this.handleChange.bind(this)
        }
        handleChange(key, val) {
            this.setState({
                [key]: val
            })
        }
        render() {
            return (
                <Comp
                    handleChange={this.handleChange}
                    state={this.state}
                    {...this.props}
                />
            )
        }
    }
}
