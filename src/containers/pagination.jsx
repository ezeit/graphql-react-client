import React from 'react';

const Pagination = ({ currentPage, nextPage, handlePreviousPageClick, handleNextPageClick }) => (    
    <div className="Pages">
        {(() => {
        if(currentPage > 1){
            return <a href="#" onClick={handlePreviousPageClick}>Anterior</a>
        }
        })()}
        {(() => {
        if(currentPage > 0){
            return <span>{currentPage}</span>
        }
        })()}
        {(() => {
        if(currentPage > 0 && nextPage){
            return <a href="#" onClick={handleNextPageClick}>Siguiente</a>
        }
        })()}
    </div>                         
 );

 export default Pagination;