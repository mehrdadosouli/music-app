import { useSelector } from "react-redux";
import TrackItem from "./TrackItem";
export default function ListMusic({ tracks }) {

    const { isPlayerVisible } = useSelector((state) => state.songs);

    return (
        <div className={`w-full flex flex-col gap-10 p-2 ${isPlayerVisible && "mb-28"} h-fit overflow-y-auto my-10 flex-1`}>
            <div className="grid md:grid-cols-4 grid-cols-1 text-white ">
                <span className="col-span-2 md:flex hidden justify-self-end">تاریخ اهنگ</span>
                <span className="justify-self-end md:flex hidden">آلبوم</span>
                <span className="justify-self-end">زمان</span>
            </div>
            {tracks && tracks?.map((item) => <TrackItem key={item.id} track={item} />)}
        </div>

    )
}
