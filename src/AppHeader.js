import React from 'react'
import { Link } from 'react-router-dom'
import './AppHeader.css'

function AppHeader(){
    return (
        <header className="App-header">
            <h3><Link to="/" className="nav-item">Home</Link></h3>
            <h1>
            React CRUD List
            </h1>
            <h3><Link to="/AddNew" className="List-Add-New nav-item">Add New Item</Link></h3>
        </header>
    )
}

export default AppHeader