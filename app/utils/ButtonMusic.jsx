import { useDispatch, useSelector } from "react-redux";
import PlayIconmusic from "~/components/icons/PlayIconmusic";
import { fetchTrackById, pauseAudio, playAudio, setTrackListMusic } from "~/redux/features/music/musicSlice";

export default function ButtonMusic({ track, bg = false }) {
  const dispatch = useDispatch();
  const { isPlaying, currentAudio, albumDetail, myFavoritemusic = [], trend } = useSelector((state) => state.songs);

  // مقایسه بر اساس src به جای id
  const isCurrentTrack = currentAudio?.src === track.src;
  
  const handleTogglePlay = () => {
    if (isPlaying && isCurrentTrack) {
      dispatch(pauseAudio());
    } else {
      dispatch(playAudio(track));
      console.log("salam",track, albumTracks)
      
      // لیست موسیقی را در Redux ذخیره کن
      let tracksToSet = null;
      
      // اگر در صفحه آلبوم هستیم
      if (albumDetail?.tracks) {
        tracksToSet = albumDetail.tracks;
      }
      // اگر در صفحه خانه (ترند) هستیم
      else if (trend && trend.length > 0) {
        tracksToSet = trend;
      }
      // اگر در صفحه مورد علاقه‌ها هستیم
      else if (myFavoritemusic && myFavoritemusic.length > 0) {
        tracksToSet = myFavoritemusic;
      }
      
      if (tracksToSet) {
        console.log("Setting tracks in Redux when playing:", tracksToSet);
        dispatch(setTrackListMusic({ tracks: tracksToSet }));
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