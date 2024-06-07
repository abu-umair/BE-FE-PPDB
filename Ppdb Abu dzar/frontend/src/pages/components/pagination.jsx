import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePrevious, handleNext, handlePageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        className={`mx-1 px-3 py-1 border rounded ${currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-gray-700'}`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-900 text-white' : 'bg-gray-300 text-black'}`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={`mx-1 px-3 py-1 border rounded ${currentPage === totalPages ? 'text-gray-500 cursor-not-allowed' : 'text-gray-700'}`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
