import React from 'react'
import logoImage from './logo.png'
import './Logo.css'

class Logo extends React.Component {
    render() {
        return (
            <div className="logo-container hi">
                <img src={logoImage} alt="logo"></img>
            </div>
        )
    }
}

export default Logo