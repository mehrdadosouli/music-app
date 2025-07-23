import { useEffect } from "react";
import ListMusicOfAlbum from "./ListMusicOfAlbum";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendSongs, setTrackListMusic } from "~/redux/features/music/musicSlice";
import { useLocation } from "react-router";

export default function TrendingSongs({ title }) {
    const dispatch = useDispatch()
    const { isLoading, trend, isPlayerVisible,searchTrack } = useSelector(state => state.songs);
    const titleArray = title.split(" ");
    const lastChar = titleArray[titleArray.length - 1]
    const { pathname } = useLocation()

    useEffect(() => {
        dispatch(fetchTrendSongs());
    }, [dispatch])
    console.log(searchTrack == "");

    useEffect(() => {
        if (trend && trend.length > 0 && pathname === "/" && isPlayerVisible && searchTrack == "") {
            dispatch(setTrackListMusic(trend));
        }else{
            dispatch(setTrackListMusic([]));
        }
    }, [trend, pathname, dispatch, isPlayerVisible,searchTrack]);

    return (
        <div>
            <h2 className="py-2 text-primarytxt text-3xl">{titleArray.slice(0, -1).join(" ")} <span className="text-primary">{lastChar}</span></h2>
            {isLoading ? (
                <div>Loading songs...</div>
            ) : Array.isArray(trend) && trend.length > 0 ? (
                <ListMusicOfAlbum tracks={trend} />
            ) : (
                <div className="text-white">No songs found.</div>
            )}
        </div>
    )
}
