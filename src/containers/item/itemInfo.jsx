import React from 'react';
import { Link } from 'react-router-dom'
import ImageLoader from 'react-load-image';
import './itemInfo.css'
import spinner from '../../spinner.gif'; 

function Preloader(props) {
    return <img src={spinner}/>;
}

const ItemInfo = ({ item }) => (
    <div className="item" id={`item_${item.id}`}>
        <div className="item-img">
        <ImageLoader src={item.thumbnail}>            
            <img />
            <div>Error!</div>
            <Preloader />
        </ImageLoader>        
        </div>
        <div className="item-info">
            <p><Link to={`/item/${item.id}`}>{item.title}</Link></p>
            <p>{item.currency_id} {item.price}</p>            
        </div>
    </div>
);

export default ItemInfo;