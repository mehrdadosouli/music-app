import { useSelector } from "react-redux";
import TrackItem from "./TrackItem";
import Pagination from "./PaginatedItems";
import { usePagination } from "~/hooks/usePagination";
export default function ListMusicOfAlbum({ tracks }) {
    const { isPlayerVisible } = useSelector((state) => state.songs);
    const { currentItems, pageCount, currentPage, handlePageChange } = usePagination({
        items: tracks,
        itemsPerPage: 5,
    });
    return (
        <div className={`w-full flex flex-col gap-10 p-2 ${isPlayerVisible && "mb-28"} h-fit overflow-y-auto my-10 flex-1`}>
            <div className="grid md:grid-cols-4 grid-cols-1 text-white ">
                <span className="col-span-2 md:flex hidden justify-self-end">تاریخ اهنگ</span>
                <span className="justify-self-end md:flex hidden">آلبوم</span>
                <span className="justify-self-end">زمان</span>
            </div>
            {currentItems && currentItems?.map((item) => <TrackItem key={item.id} track={item} />)}

            {pageCount > 1 && (
                <Pagination
                    pageCount={pageCount}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                />
            )}
        </div>

    )
}
