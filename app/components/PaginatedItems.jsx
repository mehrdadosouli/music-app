import ReactPaginate from "react-paginate";

export default function Pagination({
  pageCount,
  currentPage,
  handlePageChange,
}) {
  return (
    <div className="flex justify-center mt-12">
      <ReactPaginate
        forcePage={currentPage}
        breakLabel="..."
        nextLabel="بعدی >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< قبلی"
        containerClassName="flex gap-2"
        pageClassName="w-10 h-10 flex items-center justify-center border border-gray-300 rounded text-primarytxt hover:bg-blue-500"
        pageLinkClassName="w-full h-full flex items-center justify-center"
        previousClassName="px-4 py-2 border border-gray-300 rounded hover:bg-blue-500 text-primarytxt"
        previousLinkClassName="w-full h-full flex items-center justify-center"
        nextClassName="px-4 py-2 border border-gray-300 rounded hover:bg-blue-500 text-primarytxt"
        nextLinkClassName="w-full h-full flex items-center justify-center"
        activeClassName="bg-primary text-white border-primary"
      />
    </div>
  );
}