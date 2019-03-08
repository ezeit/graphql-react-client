import React from 'react';
import './pagination.css'

const Pagination = ({ currentPage, nextPage, handlePreviousPageClick, handleNextPageClick }) => (    
    <div className="pages">
        {(() => {
        if(currentPage > 1){
            return <a className="page-prev" href="#" onClick={handlePreviousPageClick}>&#60;</a>
        }
        })()}
        {(() => {
        if(currentPage > 0){
            return <span className="page-current">[{currentPage}]</span>
        }
        })()}
        {(() => {
        if(currentPage > 0 && nextPage){
            return <a className="page-next" href="#" onClick={handleNextPageClick}>&#62;</a>
        }
        })()}
    </div>                         
 );

 export default Pagination;