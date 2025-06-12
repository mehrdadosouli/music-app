import { useEffect } from "react";

function usePauseAllAudio(audioRef, setIsPlaying) {
  useEffect(() => {
    const handleStop = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    };
    window.addEventListener("pauseAllAudio", handleStop);
    return () => {
      window.removeEventListener("pauseAllAudio", handleStop);
    };
  }, [audioRef, setIsPlaying]);
}

export default usePauseAllAudio;
