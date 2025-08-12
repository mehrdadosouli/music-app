import { useDispatch, useSelector } from "react-redux";
import ListMusicOfAlbum from "./ListMusicOfAlbum";
import { useEffect } from "react";
import { setTrackListMusic } from "~/redux/features/music/musicSlice";
import ToastifyNotif from "~/utils/ToastifyNotif.js";
import Toastify from "~/utils/Toastify";

export default function AllTracksAlbum({ title }) {
    const dispatch = useDispatch()
    const { FetchTrackUpload, isLoadingFetchTrackUpload, errorFetchTrackUpload, searchTrack, isPlayerVisible,isLoadingUploadTrack } = useSelector(state => state.songs);
    // حذف این useEffect تا لیست موسیقی در حال پخش حفظ شود
    // useEffect(() => {
    //     if (FetchTrackUpload && FetchTrackUpload.length > 0 && isPlayerVisible && searchTrack == "") {
    //         dispatch(setTrackListMusic({ tracks: FetchTrackUpload }));
    //     } else {
    //         dispatch(setTrackListMusic([]));
    //     }
    // }, [FetchTrackUpload, dispatch, isPlayerVisible, searchTrack]);

    if (errorFetchTrackUpload) {
        return (<h1>{errorFetchTrackUpload}</h1>)
    }
    return (
        <div className="mb-24">
            <h2 className="py-2 text-primarytxt text-3xl">{title}</h2>
            {isLoadingFetchTrackUpload ? (
                <div>Loading songs...</div>
            ) : Array.isArray(FetchTrackUpload) && FetchTrackUpload.length > 0 ? (
                <ListMusicOfAlbum tracks={FetchTrackUpload} />
            ) : (
                <div className="text-white">هیچ موزیکی آپلود نشده.</div>
            )}
            <button
                onClick={async () => {
                    try {
                        await ToastifyNotif(dispatch);
                    } catch (error) {
                        Toastify(error.message);;
                    }
                }}
                disabled={isLoadingUploadTrack}
                style={{
                    marginTop:'1rem',
                    backgroundColor: isLoadingUploadTrack ? '#ccc' : '#4CAF50',
                    color: 'white',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isLoadingUploadTrack ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    marginBottom: '20px'
                }}
            >
                {isLoadingUploadTrack ? "در حال آپلود..." : "آپلود موسیقی"}
            </button>
        </div>
    )
}
