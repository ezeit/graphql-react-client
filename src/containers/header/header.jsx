import React from 'react';
import {Link} from 'react-router-dom'
import './header.css'


const Header = (props) => (
    <div className="header">
        <Link to="/" className="logo">LN Libre</Link>
    </div>
);

export default Header

