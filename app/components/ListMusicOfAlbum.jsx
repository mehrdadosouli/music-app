import { useSelector } from "react-redux";
import MusicControll from "./PlayerControll/MusicControll";
import TrackItem from "./TrackItem";
export default function ListMusicOfAlbum({ tracks }) {
    const { isPlayerVisible } = useSelector((state) => state.songs);
    return (
        <div className={`w-full flex flex-col gap-10 p-2 my-10 `}>
            <div className="grid grid-cols-4 text-white ">
                <span className="col-span-2 justify-self-end">تاریخ اهنگ</span>
                <span className="justify-self-end">آلبوم</span>
                <span className="justify-self-end">زمان</span>
            </div>
            {tracks.map((item) => <TrackItem key={item.id} track={item} />)}
            {isPlayerVisible && <MusicControll />}
        </div>

    )
}
