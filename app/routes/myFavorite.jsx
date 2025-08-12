import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import ListMusicOfAlbum from "~/components/ListMusicOfAlbum";
import Pagination from "~/components/PaginatedItems";
import { usePagination } from "~/hooks/usePagination";
import { loadFavoriteMusic, setTrackListMusic } from "~/redux/features/music/musicSlice";

export function meta() {
  return [
    { title: " صفحه ی موزیک های من" },
    { name: "myFavorite", content: "صفحه ی موزیک های من" },
  ];
}

export default function myFavorite() {
  const { pathname } = useLocation()
  const dispatch = useDispatch();
  const { myFavoritemusic, isPlayerVisible, searchTrack } = useSelector(state => state.songs)
  const { currentItems, pageCount, currentPage, handlePageChange } = usePagination({
    items: myFavoritemusic,
    itemsPerPage: 6,
  });

  useEffect(()=>{
      dispatch(loadFavoriteMusic())
  },[])

  // حذف این useEffect تا لیست موسیقی در حال پخش حفظ شود
  // useEffect(() => {
  //   if (myFavoritemusic && myFavoritemusic.length > 0 && pathname === "/myfavorite" && isPlayerVisible && searchTrack == "") {
  //     dispatch(setTrackListMusic({ tracks: myFavoritemusic }));
  //   } else {
  //     dispatch(setTrackListMusic([]));
  //   }
  // }, [myFavoritemusic, pathname, dispatch, isPlayerVisible, searchTrack]);

  return (
    <div className="mt-12 md:mt-28">
      {currentItems.length > 0 ?
        <div><ListMusicOfAlbum tracks={currentItems} /></div>
        : (
          <h2>هیچ موزیک دلخواهی هنوز انتخاب نشده</h2>
        )}

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
