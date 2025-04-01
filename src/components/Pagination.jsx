import React from 'react';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';

const Pagination = ({ pageNumber, setPageNumber, totalItem, parPage, showItem }) => {
    const totalPage = Math.ceil(totalItem / parPage);
    
    // Calculate visible page range
    let startPage = Math.max(1, pageNumber - Math.floor(showItem / 2));
    let endPage = Math.min(totalPage, startPage + showItem - 1);
    
    // Adjust if we don't have enough pages
    if (endPage - startPage + 1 < showItem) {
        startPage = Math.max(1, endPage - showItem + 1);
    }

    const createBtns = () => {
        const btns = [];
        for (let i = startPage; i <= endPage; i++) {
            btns.push(
                <li
                    key={i}
                    onClick={() => setPageNumber(i)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all
                        ${pageNumber === i 
                            ? 'bg-orange-500 text-white shadow-lg' 
                            : 'bg-gray-100 hover:bg-orange-100 text-gray-600 hover:text-orange-500'}
                    `}
                    aria-label={`Go to page ${i}`}
                >
                    {i}
                </li>
            );
        }
        return btns;
    };

    if (totalPage <= 1) return null; // Hide pagination if only 1 page

    return (
        <ul className="flex items-center gap-2">
            {/* Previous Button */}
            <li
                onClick={() => setPageNumber(pageNumber - 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
                    ${pageNumber === 1 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-100 hover:bg-orange-100 text-orange-500 hover:text-orange-600'}
                `}
                aria-disabled={pageNumber === 1}
                aria-label="Previous page"
            >
                <BsChevronDoubleLeft className="text-sm" />
            </li>

            {/* Page Numbers */}
            {createBtns()}

            {/* Next Button */}
            <li
                onClick={() => setPageNumber(pageNumber + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
                    ${pageNumber === totalPage 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-100 hover:bg-orange-100 text-orange-500 hover:text-orange-600'}
                `}
                aria-disabled={pageNumber === totalPage}
                aria-label="Next page"
            >
                <BsChevronDoubleRight className="text-sm" />
            </li>
        </ul>
    );
};

export default Pagination;