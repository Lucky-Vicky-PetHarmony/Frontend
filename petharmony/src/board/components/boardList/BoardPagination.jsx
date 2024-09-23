import React from "react";
import '../../style/boardList/BoardPagination.css';
import arrowimg from '../../asset/arrow.png';


const BoardPagination = ({setPage, totalPages, currentPage, customClass}) => {

    const handlePageClick = (page) => {
        setPage(prevPage => {
            return page;
          });
    }

    const handlePrevClick = () => {
        if (currentPage > 1) {
            handlePageClick(currentPage - 1);
        }
    }

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            handlePageClick(currentPage + 1);
        }
    }

    return (
        <div className={`boardpagination ${customClass}`} >
            <img 
                className="boardpagination_arrow_left" 
                src={arrowimg} 
                alt=""
                onClick={handlePrevClick} 
                style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed' }}  
            />
            <div className="boardpagination_pagenumber">
                {[...Array(totalPages).keys()].map(page => (
                    <p 
                        key={page + 1} 
                        className={currentPage === page + 1 ? 'active' : ''}
                        onClick={() => handlePageClick(page + 1)}
                    >
                        {page + 1}
                    </p>
                ))}
            </div>
            <img 
                className="boardpagination_arrow_right" 
                src={arrowimg} 
                alt=""
                onClick={handleNextClick} 
                style={{ cursor: currentPage < totalPages ? 'pointer' : 'not-allowed' }}  />
        </div>
    );
}

export default BoardPagination;