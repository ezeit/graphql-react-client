import React from 'react';
import { Link } from 'react-router-dom'
import './itemInfo.css'

const ItemInfo = ({ item, handleClick }) => (
    <div className="item">
        <div className="item-img">
        <Link to={`/item/${item.id}`}><img src={item.thumbnail}></img></Link>
        </div>
        <div className="item-info">
            <p><Link to={`/item/${item.id}`}>{item.title}</Link></p>
            <p>{item.currency_id} {item.price}</p>            
        </div>
    </div>
);

export default ItemInfo;