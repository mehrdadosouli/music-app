import { useDispatch, useSelector } from "react-redux";
import TrackItem from "./TrackItem";
import { actionMoreOption, addFavoriteMusic } from "~/redux/features/music/musicSlice";
import { useNavigate } from "react-router";

export default function ListMusicOfAlbum({ tracks, albumTracks = null }) {
    const { isPlayerVisible, likedMusic } = useSelector((state) => state.songs);
    const dispatch = useDispatch();
    const navigate=useNavigate()

    const clickHandler = (trackId) => {
        dispatch(actionMoreOption(trackId))
    }
    const likeHandler = (track) => {
        dispatch(addFavoriteMusic(track))
    }
    const addHandler = (track) => {
        navigate(`/myPlayList?id=${track.id}`)
    }

    return (
        <div className={`w-full flex flex-col gap-10 p-2 ${isPlayerVisible && "mb-28"} h-fit overflow-y-auto py-12 scrollbar-thin-custom flex-1`}>
            <div className="grid md:grid-cols-4 grid-cols-1 text-primarytxt ">
                <span className="col-span-2 md:flex hidden justify-self-end">تاریخ اهنگ</span>
                <span className="justify-self-end md:flex hidden">آلبوم</span>
                <span className="justify-self-end">زمان</span>
            </div>
            {tracks && tracks?.map((item) => {
                if (!item || !item.id) {
                    return null;
                }
                return (
                    <TrackItem likeHandler={likeHandler} addHandler={addHandler} onToggle={() => clickHandler(item.id)} isOpen={likedMusic === item.id} key={item.id} track={item} albumTracks={albumTracks || tracks} />
                    // <TrackItem likeHandler={likeHandler} addHandler={addHandler} onToggle={() => clickHandler(item.id)} isOpen={likedMusic === item.id} key={item.id} track={item} />
                )

            })}
        </div>

    )
}
