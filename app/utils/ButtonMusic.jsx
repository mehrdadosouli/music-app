import { useDispatch, useSelector } from "react-redux";
import PlayIconmusic from "~/components/icons/PlayIconmusic";
import { pauseAudio, playAudio } from "~/redux/features/music/musicSlice";

export default function ButtonMusic({ track, bg = false }) {
  const dispatch = useDispatch();
  const { isPlaying, currentAudio } = useSelector((state) => state.songs);

  // مقایسه بر اساس src به جای id
  const isCurrentTrack = currentAudio?.src === track.src;

  const handleTogglePlay = () => {
    if (isPlaying && isCurrentTrack) {
      dispatch(pauseAudio());
    } else {
      dispatch(playAudio(track));
      document.body.classList.add('noScroll');
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