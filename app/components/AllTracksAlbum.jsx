import { useDispatch, useSelector } from "react-redux";
import ListMusicOfAlbum from "./ListMusicOfAlbum";
import { useEffect } from "react";
import { setTrackListMusic } from "~/redux/features/music/musicSlice";

export default function AllTracksAlbum({title}) {
    const dispatch=useDispatch()
    const { FetchTrackUpload, isLoadingFetchTrackUpload, errorFetchTrackUpload ,searchTrack ,isPlayerVisible} = useSelector(state => state.songs);
    useEffect(() => {
            if (FetchTrackUpload && FetchTrackUpload.length > 0 && isPlayerVisible && searchTrack == "") {
                dispatch(setTrackListMusic({ tracks: FetchTrackUpload }));
            } else {
                dispatch(setTrackListMusic([]));
            }            
        }, [FetchTrackUpload, dispatch, isPlayerVisible, searchTrack]);
    
    if(errorFetchTrackUpload){
        return (<h1>{errorFetchTrackUpload}</h1>)
    }
    return (
        <div>
            <h2 className="py-2 text-primarytxt text-3xl">{title}</h2>
            {isLoadingFetchTrackUpload ? (
                <div>Loading songs...</div>
            ) : Array.isArray(FetchTrackUpload) && FetchTrackUpload.length > 0 ? (
                <ListMusicOfAlbum tracks={FetchTrackUpload} />
            ) : (
                <div className="text-white">هیچ موزیکی آپلود نشده.</div>
            )}
        </div>
    )
}
