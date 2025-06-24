import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayIconmusic from "~/components/icons/PlayIconmusic";
import { pauseAudio, playAudio } from "~/redux/features/music/musicSlice";

export default function ButtonMusic({ track, bg = false }) {
    const dispatch=useDispatch();
    const {isPlaying,currentAudio}=useSelector((state)=>state.songs); 
    const isCurrent=currentAudio === track;
    const audioRef = useRef(null);
    const handlePlay = () => {
        if (!audioRef.current) return
        if (isPlaying && isCurrent) {
            audioRef.current.pause()
            dispatch(pauseAudio())
        } else {
            audioRef.current.play()
            dispatch(playAudio(track))
        }
    };
    useEffect(()=>{
        if(audioRef.current){            
            if(isPlaying && isCurrent){
                audioRef.current.play()
            }else{
                audioRef.current.pause()
            }
        }
    },[isPlaying,isCurrent])
    return (
        <>
            <button onClick={handlePlay} className={`${bg ? "size-14 bg-bgcard" : "size-14 bg-primarytxt"}  flex gap-2 justify-center items-center rounded-full`}>
                {
                 isCurrent  && isPlaying ? <img src="/photos/audio-wave.gif" className="rounded-lg" /> : <PlayIconmusic />
                }
            </button>
            <audio ref={audioRef} src={`/music/${track}.mp3`} />
        </>
    )
}
