import React from 'react';
import {Link } from 'react-router-dom'

const ItemInfo = ({ item, handleClick }) => (        
    <p><Link to={`/item/${item.id}`}>{item.title}</Link></p>
 );

 export default ItemInfo;