const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-8">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`mx-2 p-2 rounded-full ${
            index + 1 === currentPage ? "bg-orange-500" : "bg-gray-700"
          } text-white`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
