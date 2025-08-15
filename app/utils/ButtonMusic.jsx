import { useDispatch, useSelector } from "react-redux";
import PlayIconmusic from "~/components/icons/PlayIconmusic";
import { fetchTrackById, pauseAudio, playAudio, setTrackListMusic } from "~/redux/features/music/musicSlice";

export default function ButtonMusic({ track, bg = false, albumTracks = null }) {
  const dispatch = useDispatch();
  const { isPlaying, currentAudio, albumDetail, myFavoritemusic = [] } = useSelector((state) => state.songs);

  // مقایسه بر اساس src به جای id
  const isCurrentTrack = currentAudio?.src === track.src;
  
  const handleTogglePlay = () => {
    if (isPlaying && isCurrentTrack) {
      dispatch(pauseAudio());
    } else {
      // موسیقی را پخش کن
      dispatch(playAudio(track));
      console.log("Playing track:", track);
      
      // فقط اگر موسیقی جدید پخش می‌شود، لیست موسیقی را در Redux ذخیره کن
      if (!isCurrentTrack) {
        if (albumTracks) {
          console.log("Setting tracks in Redux when playing new track:", albumTracks);
          dispatch(setTrackListMusic({ tracks: albumTracks }));
        } else if (myFavoritemusic && myFavoritemusic.length > 0) {
          // اگر موسیقی در لیست مورد علاقه است، لیست مورد علاقه را تنظیم کن
          const isInFavorites = myFavoritemusic.find(item => item.id === track.id);
          if (isInFavorites) {
            console.log("Setting favorites list in Redux when playing favorite track");
            dispatch(setTrackListMusic({ tracks: myFavoritemusic }));
          }
        }
      }
    }
  };
  

  return (
    <button
      onClick={handleTogglePlay}
      className={`${bg ? "size-14 bg-bgcard" : "md:size-14 size-8 bg-primarytxt"} flex justify-center items-center rounded-full transition-transform duration-200 hover:scale-110`}
    >
      {isCurrentTrack && isPlaying ? (
        <img src="/photos/audio-wave.gif" className="rounded-lg size-8" alt="Playing" />
      ) : (
        <PlayIconmusic />
      )}
    </button>
  );
}