import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAlbum, setCurrentPage } from "~/redux/features/music/musicSlice";
import { useSearchParams } from "react-router";

export function usePagination() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const { itemsPerPage, currentPage, allAlbum } = useSelector(state => state.songs);

    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

    useEffect(() => {
        dispatch(fetchAllAlbum());
        dispatch(setCurrentPage(pageFromUrl - 1));
    }, [dispatch, pageFromUrl]);

    const handlePageChange = ({ selected }) => {
        dispatch(setCurrentPage(selected));
        if (selected !== 0) {
            setSearchParams({ page: selected + 1 });
        } else {
            setSearchParams();
        }
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = allAlbum?.slice(offset, offset + itemsPerPage) || [];
    const pageCount = Math.ceil((allAlbum?.length || 0) / itemsPerPage);

    return {
        currentItems,
        pageCount,
        currentPage,
        handlePageChange,
    };
}
