import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ListMusicOfAlbum from "~/components/ListMusicOfAlbum";
import Pagination from "~/components/PaginatedItems";
import { usePagination } from "~/hooks/usePagination";
import { loadplayList } from "~/redux/features/music/musicSlice";

export default function MyPlayListDetail() {
    const { listId } = useParams();
    const dispatch = useDispatch()
    const { playList } = useSelector(state => state.songs);
    const [data, setData] = useState(null);
    const { currentItems, pageCount, currentPage, handlePageChange } = usePagination({
        items: data ? data.music : [],  // داده باید از tracks گرفته شود
        itemsPerPage: 6,
    });

    useEffect(() => {
        if (playList.length) {
            const result = playList.find(item => item.id === listId);
            setData(result);
        } else {
            dispatch(loadplayList())
        }
    }, [playList, listId]); // وابسته به playList و listId

    return (
        <div className="mt-12 md:mt-32">
            {currentItems.length ? (
                <>
                    <div><ListMusicOfAlbum tracks={currentItems} /></div>
                    {pageCount > 1 && (
                        <Pagination
                            pageCount={pageCount}
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                        />
                    )}
                </>
            ) : (
                <h2 className="text-primarytxt">هیچ موزیک دلخواهی هنوز انتخاب نشده</h2>
            )}
        </div>
    );
}
