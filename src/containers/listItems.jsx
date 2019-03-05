import React from 'react';
import ItemInfo from './itemInfo'

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