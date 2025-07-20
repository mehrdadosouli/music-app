import { useEffect } from "react";
import ListMusicOfAlbum from "./ListMusicOfAlbum";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendSongs } from "~/redux/features/music/musicSlice";

export default function TrendingSongs({ title }) {
    const dispatch = useDispatch()
    const tracks = useSelector(state => state.songs?.track);
    const isLoading = useSelector(state => state.songs?.isLoading);
    const titleArray = title.split(" ");
    const lastChar = titleArray[titleArray.length - 1]
    useEffect(() => {
        dispatch(fetchTrendSongs());
    }, [dispatch])
    return (
        <div>
            <h2 className="py-2 text-primarytxt text-3xl">{titleArray.slice(0, -1).join(" ")} <span className="text-primary">{lastChar}</span></h2>
            {isLoading ? (
                <div>Loading songs...</div>
            ) : Array.isArray(tracks) && tracks.length > 0 ? (
                <ListMusicOfAlbum tracks={tracks} />
            ) : (
                <div className="text-white">No songs found.</div>
            )}
        </div>
    )
}
