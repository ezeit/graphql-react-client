import React from 'react';
import {Link} from 'react-router-dom'
import './pagination.css'

const Pagination = ({ query, currentPage, order, nextPage, handlePreviousPageClick, handleNextPageClick }) => (    
    <div className="pages">
        {(() => {
        if(currentPage > 1){
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
            return <Link to={`/search/${query}/${currentPage+1}/${order}`} onClick={handleNextPageClick} className="page-next">&#62;</Link>
        }
        })()}
    </div>                         
 );

 export default Pagination;