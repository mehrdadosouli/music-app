import { useRef, useState } from "react";
import PlayIconmusic from "~/components/icons/PlayIconmusic";
import usePauseAllAudio from "~/components/useStopAllAdudio";

export default function ButtonMusic({ track, bg = false }) {

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const handlePlay = () => {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
        } else {
            window.dispatchEvent(new Event("pauseAllAudio"));
            audioRef.current.play()
            setIsPlaying(true)
        }
    };
    usePauseAllAudio(audioRef, setIsPlaying);
    return (
        <>
            <button onClick={handlePlay} className={`${bg ? "size-14 bg-bgcard" : "size-14 bg-primarytxt"}  flex gap-2 justify-center items-center rounded-full`}>
                {
                    isPlaying ? <img src="/photos/audio-wave.gif" className="rounded-lg" /> : <PlayIconmusic />
                }
            </button>
            <audio ref={audioRef} src={`/music/${track}.mp3`} />
        </>
    )
}
