import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSongs from "~/components/CardSongs";
import Pagination from "../components/PaginatedItems";
import { fetchAllAlbum } from "~/redux/features/music/musicSlice";
import { usePagination } from "../hooks/usePagination";

export default function Albums() {
  const dispatch = useDispatch();
  const { allAlbum } = useSelector(state => state.songs);

  useEffect(() => {
    dispatch(fetchAllAlbum());
  }, [dispatch]);

  const { currentItems, pageCount, currentPage, handlePageChange } = usePagination({
    items: allAlbum,
    itemsPerPage: 5,
  });

  return (
    <div className="container mx-auto px-4 my-32">
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
        {currentItems.length > 0 ? (
          currentItems.map(album => (
            <div key={album.id} className="keen-slider__slide overflow-hidden rounded-xl">
              <CardSongs song={album} />
            </div>
          ))
        ) : (
          <p>داده‌ای برای نمایش وجود ندارد.</p>
        )}
      </div>

      {pageCount > 1 && (
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}
