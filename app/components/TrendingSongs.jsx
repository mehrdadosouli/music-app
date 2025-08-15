import { useEffect } from "react";
import ListMusicOfAlbum from "./ListMusicOfAlbum";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendSongs, setTrackListMusic, restoreCurrentPlaylist } from "~/redux/features/music/musicSlice";
import { useLocation } from "react-router";

export default function TrendingSongs({ title }) {
    const dispatch = useDispatch()
    const { isLoading, trend, isPlayerVisible, searchTrack, currentPlaylist } = useSelector(state => state.songs);
    const titleArray = title.split(" ");
    const lastChar = titleArray[titleArray.length - 1]
    const { pathname } = useLocation()
    
    // برای debug
    console.log("TrendingSongs - currentPlaylist:", currentPlaylist);
    console.log("TrendingSongs - pathname:", pathname);
    console.log("TrendingSongs - isPlayerVisible:", isPlayerVisible);
    
    useEffect(() => {
        dispatch(fetchTrendSongs());
    }, [])
    
    // حذف کامل این useEffect که باعث تغییر لیست موزیک می‌شد
    // useEffect(() => {
    //     // غیرفعال کردن تنظیم خودکار لیست موسیقی
    //     // این کار باعث می‌شود لیست آلبوم حفظ شود
    //     console.log("TrendingSongs useEffect disabled - keeping current playlist");
    // }, [trend, pathname, dispatch, isPlayerVisible, searchTrack, currentPlaylist]);

    return (
        <div>
            <h2 className="py-2 text-primarytxt text-3xl">{titleArray.slice(0, -1).join(" ")} <span className="text-primary">{lastChar}</span></h2>
            {isLoading ? (
                <div>Loading songs...</div>
            ) : Array.isArray(trend) && trend.length > 0 ? (
                <ListMusicOfAlbum tracks={trend}  />
            ) : (
                <div className="text-white">No songs found.</div>
            )}
        </div> 
    )
}
