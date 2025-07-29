import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { setCurrentPage } from "~/redux/features/music/musicSlice";

export function usePagination({ items = [], itemsPerPage = 5 }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useSelector((state) => state.songs.currentPage || 0);

  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    dispatch(setCurrentPage(pageFromUrl - 1));
  }, [dispatch, pageFromUrl]);

  const pageCount = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const offset = currentPage * itemsPerPage;
  const currentItems = items.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    dispatch(setCurrentPage(selected));
    setSearchParams(selected === 0 ? {} : { page: selected + 1 });
  };

  return { currentItems, pageCount, currentPage, handlePageChange };
}
