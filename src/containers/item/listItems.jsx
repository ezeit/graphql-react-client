import React from 'react';
import ItemInfo from './itemInfo'
import './listItems.css'

const ListItems = ({ items, order, currentPage, handleASCClick, handleDESCClick }) => (
  <div className="results">
    {currentPage > 0 &&
      <div>
      <span className={`order ${order !== 'DESC' ? 'active' : ''}`} onClick={handleASCClick}>Ascendente</span>
      <span className={`order ${order === 'DESC' ? 'active' : ''}`} onClick={handleDESCClick}>Descendente</span>
    </div>
    }    
    <div className='ListItems' role="button">
      {items && items.map((item) => {
        return <ItemInfo key={item.id}  item={item}></ItemInfo>
      })}
    </div>    
  </div>
);

export default ListItems