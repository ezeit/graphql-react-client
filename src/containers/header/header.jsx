import React from 'react';
import {Link} from 'react-router-dom'
import './header.css'


const Header = (props) => (
    <div className="header">
        <Link to="/" className="logo">LN Libre</Link>
        {/* <div class="header-right">
            <a href="#about">About</a>
            <a class="active" href="#home">Home</a>
            <a href="#contact">Contact</a>
        </div> */}
    </div>
);

export default Header

