import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
const PageNation = (props) => {
    const { data, pageData } = props;
    // console.log('data ci ', data)
    const [currentItems, setCurrentItems] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    // const [endOffset,setEndOffset]=useState(0)
    const recoardsPerPage = 10;
    useEffect(() => {
       const endOffset=itemOffset + recoardsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        console.log("jsdbvhfs ",itemOffset ,"  ",endOffset)
        console.log("current page ", currentItems)
        setPageCount(Math.ceil(data.length / recoardsPerPage));
       
    }, [itemOffset, recoardsPerPage, data])
    
    const handlePageClick = (event) => {
        const newOffset = (event.selected * recoardsPerPage) % data.length;
        // console.log("newOffset ",event.selected )
        setItemOffset(newOffset);
    };
    pageData(currentItems);
    return (
        <div className='show-items'>
             <div >Showing {itemOffset+1} to {currentItems.length+itemOffset} of {data.length} entries</div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="Previous"
                renderOnZeroPageCount={null}
                containerClassName='pagination'
                pageLinkClassName='page-num'
                previousLinkClassName='page-num'
                nextLinkClassName='page-num'
                activeLinkClassName='active'
            />

        </div>
    )
}

export default PageNation