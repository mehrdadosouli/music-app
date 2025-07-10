import { useDispatch, useSelector } from "react-redux";
import PlayIconmusic from "~/components/icons/PlayIconmusic";
import { pauseAudio, playAudio } from "~/redux/features/music/musicSlice";

export default function ButtonMusic({ track, bg = false }) {
    const dispatch = useDispatch();
    const { isPlaying, currentAudio } = useSelector((state) => state.songs);

    const isCurrentTrack = currentAudio?.id === track.id;

    const handleTogglePlay = () => {
    // اگر این آهنگ در حال پخش است، متوقفش کن
    if (isPlaying && isCurrentTrack) {
      dispatch(pauseAudio());
    } else {
      // در غیر این صورت، این آهنگ را پخش کن
      dispatch(playAudio(track));
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