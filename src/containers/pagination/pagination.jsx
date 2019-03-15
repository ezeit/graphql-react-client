import React from 'react';
import {Link} from 'react-router-dom'
import './pagination.css'

const Pagination = ({ query, currentPage, order, nextPage, handlePreviousPageClick, handleNextPageClick }) => (    
    <div className="pages">
        {(() => {
        if(currentPage > 1){
            {/* return <a className="page-prev" href="#" onClick={handlePreviousPageClick}>&#60;</a> */}
            return <Link to={`/search/${query}/${currentPage-1}/${order}`} onClick={handlePreviousPageClick} className="page-prev">&#60;</Link>
        }
        })()}
        {(() => {
        if(currentPage > 0){
            return <span className="page-current">[{currentPage}]</span>
        }
        })()}
        {(() => {
        if(currentPage > 0 && nextPage){
            {/* return <a className="page-next" href="#" onClick={handleNextPageClick}>&#62;</a> */}
            return <Link to={`/search/${query}/${currentPage+1}/${order}`} onClick={handleNextPageClick} className="page-next">&#62;</Link>
        }
        })()}
    </div>                         
 );

 export default Pagination;