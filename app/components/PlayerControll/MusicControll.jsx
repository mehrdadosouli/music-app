import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextMusicBtn, pauseAudio, playAudio, prevMusicBtn } from "~/redux/features/music/musicSlice";
import { formatDuration } from "~/utils/formatDuration";

export default function MusicControll() {
    const dispatch = useDispatch();
    const audioRef = useRef(null);
    const timelineRef = useRef(null);
    // State ها را از Redux بگیرید
    const { isPlaying, currentAudio } = useSelector((state) => state.songs);

    // State های محلی برای زمان حال و کل زمان آهنگ
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    // 1. useEffect برای مدیریت رویدادهای مدیا (فقط یکبار اجرا می‌شود)
    useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        // اضافه کردن Event Listener ها
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);

        // تابع پاکسازی برای حذف Listener ها هنگام unmount شدن کامپوننت
        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
    }, []); // <-- وابستگی خالی یعنی فقط یکبار در مانت اجرا شود

    // 2. useEffect برای تغییر آهنگ
    useEffect(() => {
        if (currentAudio && audioRef.current) {
            audioRef.current.src = `/music/${currentAudio.id}.mp3`;
            // مرورگر را مجبور به بارگذاری آهنگ جدید می‌کنیم
            audioRef.current.load();
            if (isPlaying) {
                // اگر در حالت پخش بودیم، آهنگ جدید را پلی کن
                audioRef.current.play().catch(error => console.error("Error playing new track:", error));
            }
        }
    }, [currentAudio]); // <-- فقط به تغییر آهنگ وابسته است

    // 3. useEffect برای کنترل Play/Pause
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.error("Play failed:", error);
                    dispatch(pauseAudio());
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]); // <-- فقط به وضعیت پخش وابسته است


    // --- توابع Handler ---
    const handlePlayPause = () => {
        if (isPlaying) {
            dispatch(pauseAudio());
        } else {
            if (currentAudio) {
                dispatch(playAudio(currentAudio));
            }
        }
    };

    const nextMusicHandler = () => dispatch(nextMusicBtn(currentAudio));
    const prevMusicHandler = () => dispatch(prevMusicBtn(currentAudio));

    const handleSeek = (e) => {
        if (duration > 0 && timelineRef.current) {
            const timelineWidth = timelineRef.current.clientWidth;
            const clickPositionX = e.nativeEvent.offsetX;
            const newTime = (clickPositionX / timelineWidth) * duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const changeVolumeHandler =(e)=>{
        setVolume(e.target.value)
    }
    useEffect(()=>{
        if(audioRef.current){
            audioRef.current.volume=volume
        }
    },[volume])

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
    console.log(currentAudio);
    
    return (
        <div className="flex items-start ">
            {/* info music */}
            <div className="w-1/6">
                <div className="flex items-center space-x-4 gap-3">
                    <img src={currentAudio.cover_url} loading="lazy" decoding="async" alt="" className="flex-none rounded-lg bg-slate-100 object-cover" width="100" height="88" />
                    <div className="min-w-0 flex-auto space-y-1 font-semibold">
                        <p className="text-cyan-500 transition-all duration-500 text-sm leading-6">
                            <abbr title="Episode">Ep.</abbr> {currentAudio.albumId}
                        </p><h2 className="text-slate-200 transition-all duration-500 text-sm leading-6 truncate">
                            {currentAudio.albumTitle} 
                        </h2>
                        <p className="text-slate-200 transition-all duration-500 text-lg">
                            {currentAudio.artistName}
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-4/6 relative z-10 ">
                <div className="border-slate-100 transition-all duration-500 border-b rounded-t-xl p-4 pb-6 ">
                    <div className="space-y-2">
                        {/* Timeline */}
                        <div dir="ltr" ref={timelineRef} onClick={handleSeek} className="relative cursor-pointer">
                            <div className="bg-slate-100 rounded-full overflow-hidden h-2">
                                <div className="bg-cyan-500 h-2" style={{ width: `${progressPercentage}%` }}></div>
                            </div>
                            <div className="ring-cyan-500 ring-2 absolute top-1/2 w-4 h-4 flex items-center justify-center bg-white rounded-full shadow" style={{ left: `${progressPercentage}%`, transform: 'translateX(-50%) translateY(-50%)', }} >
                                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
                            </div>
                        </div>
                        {/* Time Display */}
                        <div className="flex justify-between text-sm font-medium tabular-nums">
                            <div className="text-slate-500">{formatDuration(duration)}</div>
                            <div className="text-cyan-500">{formatDuration(currentTime)}</div>
                        </div>
                    </div>
                </div>
                <div className=" text-white transition-all duration-500 rounded-b-xl flex items-center">
                    <div className="flex-auto flex items-center justify-evenly">
                        <button type="button" aria-label="Add to favorites">
                            <svg width="24" height="24">
                                <path d="M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                        <button type="button" className="hidden sm:block lg:hidden xl:block" aria-label="Next" onClick={prevMusicHandler}>
                            <svg width="24" height="24" fill="none">
                                <path d="m10 12 8-6v12l-8-6Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M6 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                        <button type="button" aria-label="Rewind 10 seconds">
                            <svg width="24" height="24" fill="none">
                                <path d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M5 5v3.111c0 .491.398.889.889.889H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                    </div>
                    <button
                        type="button"
                        className="bg-white text-slate-900 transition-all duration-500 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
                        aria-label={isPlaying ? "Pause" : "Play"}
                        onClick={handlePlayPause}
                    >
                        {isPlaying ? (
                            <svg width="30" height="32" fill="currentColor">
                                <rect x="6" y="4" width="4" height="24" rx="2"></rect>
                                <rect x="20" y="4" width="4" height="24" rx="2"></rect>
                            </svg>
                        ) : (
                            <svg width="30" height="32" fill="currentColor" className="ml-1">
                                <path d="M6 4l20 12L6 28V4z"></path>
                            </svg>
                        )}
                    </button>
                    <div className="flex-auto flex items-center justify-evenly">
                        <button type="button" aria-label="Skip 10 seconds" className="">
                            <svg width="24" height="24" fill="none">
                                <path d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M19 5v3.111c0 .491-.398.889-.889.889H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                        <button type="button" className="hidden sm:block lg:hidden xl:block" aria-label="Previous" onClick={nextMusicHandler}>
                            <svg width="24" height="24" fill="none">
                                <path d="M14 12 6 6v12l8-6Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M18 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                        <button type="button" className="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-white text-white transition-all duration-500 ">
                            1x
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-1/6 flex justify-center items-center h-36">
                <input type="range" id="volume" min="0" max="1" step="0.01" value={volume}  onChange={changeVolumeHandler}/>
                <span className="text-white px-2">{Math.round(volume * 100)}</span>
            </div>
            <audio ref={audioRef} />
        </div>
    );
}