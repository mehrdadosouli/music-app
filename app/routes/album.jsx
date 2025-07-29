import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSongs from "~/components/CardSongs";
import { fetchAllAlbum, setCurrentPage } from "~/redux/features/music/musicSlice";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router";

export function meta() {
  return [
    { title: "صفحه ی آلبوم‌ها" },
    { name: "موزیک", content: "خوش آمدید به صفحه آلبوم‌ها" },
  ];
}

export default function Albums() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const {itemsPerPage,currentPage}=useSelector(state=>state.songs)
  const { allAlbum } = useSelector((state) => state.songs);

  const pageFormUrl = parseInt(searchParams.get('page') || "1", 10)

  useEffect(() => {
    dispatch(fetchAllAlbum());
    dispatch(setCurrentPage(pageFormUrl - 1));
  }, [dispatch,pageFormUrl]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    if (selected !== 0) {
      setSearchParams({ page: selected + 1 });
    } else {
      setSearchParams()
    }
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = allAlbum?.slice(offset, offset + itemsPerPage) || [];
  const pageCount = Math.ceil((allAlbum?.length || 0) / itemsPerPage);

  return (
    <div className="container mx-auto px-4 my-32">
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
        {currentItems.length > 0 ? (
          currentItems.map((album) => (
            <div
              key={album.id}
              className="keen-slider__slide overflow-hidden rounded-xl"
            >
              <CardSongs song={album} />
            </div>
          ))
        ) : (
          <p>داده‌ای برای نمایش وجود ندارد.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {pageCount > 1 && (
        <div className="flex justify-center mt-12">
          <ReactPaginate
            forcePage={currentPage} // ✅ حفظ وضعیت صفحه در UI
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
      )}
    </div>
  );
}
