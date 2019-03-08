import React from 'react';
import { Link } from 'react-router-dom'
import ItemInfo from './itemInfo'
import './listItems.css'

const ListItems = ({ items, handleClick }) => (
    <div
       className='ListItems'
       onClick={handleClick}
       role="button">       
        {items && items.map((item) => {                                  
            return <ItemInfo item={item} handleClick={handleClick}></ItemInfo>
          })}
    </div>
 );

 export default ListItems