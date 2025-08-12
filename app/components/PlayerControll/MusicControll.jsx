import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionBtn, addFavoriteMusic, nextMusicBtn, pauseAudio, playAudio, prevMusicBtn, setMinustMusic, setPlayerVisibility, setTrackListMusic } from "~/redux/features/music/musicSlice";
import { formatDuration } from "~/utils/formatDuration";
import Sound from "../icons/Sound";
import CloseBtn from "../icons/CloseIcon";

export default function MusicControll() {
    const dispatch = useDispatch();
    const audioRef = useRef(null);
    const timelineDesktopRef = useRef(null);
    const timelineMobileRef = useRef(null);
    const [showSound, setShowSound] = useState(false)
    // State ها را از Redux بگیرید
    const { isPlaying, currentAudio, myFavoritemusic, minusMusic, currentPlaylist } = useSelector((state) => state.songs);

    // State های محلی برای زمان حال و کل زمان آهنگ
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    let findMusicLiked = currentAudio && myFavoritemusic ? myFavoritemusic.find(item => item.id === currentAudio.id) : undefined;

    // 1. useEffect برای مدیریت رویدادهای مدیا (فقط یکبار اجرا می‌شود)
    useEffect(() => {
        if (!audioRef.current) return;
        // بروزر بودن تایم لانگ با تغییر currentTime
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
            console.log("Loading audio file:", currentAudio.src); // برای debug
            audioRef.current.src = `${currentAudio.src}`;
            audioRef.current.load();

            // اضافه کردن error handling
            audioRef.current.onerror = (e) => {
                console.error("Audio loading error:", e);
                console.error("Audio URL:", currentAudio.src);
            };

            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.error("Error playing new track:", error);
                    console.error("Audio URL:", currentAudio.src);
                });
            }
        }
    }, [currentAudio]); // فقط currentAudio

    // 3. useEffect برای کنترل Play/Pause
    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.play().catch(error => {
                console.error("Play failed:", error);
                dispatch(pauseAudio());
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current && duration > 0 && Math.abs(currentTime - duration) < 0.5) {
            audioRef.current.pause();
            dispatch(pauseAudio());
            audioRef.current.currentTime = 0; // ریست تایم‌لاین به ابتدا
            setCurrentTime(0); // اگر state محلی داری
        }
    }, [currentTime, duration]);


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

    const handleSeek = (e, isMobile = false) => {
        const ref = isMobile ? timelineMobileRef : timelineDesktopRef;
        if (duration > 0 && ref.current) {
            const timelineWidth = ref.current.clientWidth;
            const clickPositionX = e.nativeEvent.offsetX;
            const newTime = (clickPositionX / timelineWidth) * duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const changeVolumeHandler = (e) => {
        setVolume(e.target.value)
    }
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])
    // مدیریت پیشرفت تایم لانگ 
    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
    // هندلرهای جدید برای عقب/جلو بردن 10 ثانیه
    const handleRewind10 = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
            setCurrentTime(audioRef.current.currentTime);
        }
    };
    const handleSkip10 = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
            setCurrentTime(audioRef.current.currentTime);
        }
    };
    // closebtn handler
    const buttonHandler = () => {
        dispatch(actionBtn(true))
        dispatch(pauseAudio())
        // حذف dispatch(setTrackListMusic([])) تا لیست موسیقی حفظ شود
        dispatch(setPlayerVisibility(false))
        document.body.classList.remove('noScroll');
    }
    // minus handler
    const minusHandle = () => {
        dispatch(setMinustMusic(false))
        document.body.classList.remove('noScroll');
    }
    console.log("current", currentAudio);
    console.log("currentPlaylist", currentPlaylist);

    return (
        <div>
            {/* music controll for desctop */}
            {
                !minusMusic &&
                <div className={`hidden md:fixed md:bottom-0 md:left-10 md:right-0 md:mx-auto md:flex md:items-start md:px-2 md:pr-10 md:py-10 bg-bgplayercontroll`}>
                    <div className="w-1/6">
                        <div className="flex items-center space-x-4 gap-3">
                            {currentAudio && (
                                <img src={currentAudio.cover_url} loading="lazy" decoding="async" alt="" className="flex-none rounded-lg bg-slate-100 object-cover" width="100" height="88" />
                            )}
                            <div className="min-w-0 flex-auto space-y-1 font-semibold">
                                <p className="text-cyan-500 transition-all duration-500 text-sm leading-6">
                                    <abbr title="Episode">Ep.</abbr> {currentAudio ? currentAudio.albumId : "-"}
                                </p>
                                <h2 className="text-slate-200 transition-all duration-500 text-sm leading-6 truncate">
                                    {currentAudio ? currentAudio.albumTitle : "-"}
                                </h2>
                                <p className="text-slate-200 transition-all duration-500 text-lg">
                                    {currentAudio ? currentAudio.artistName : "-"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-4/6 relative z-10 ">
                        <div className="border-slate-100 transition-all duration-500 border-b rounded-t-xl p-4 pb-6 ">
                            <div className="space-y-2">
                                <div dir="ltr" ref={timelineDesktopRef} onClick={e => handleSeek(e, false)} className="relative cursor-pointer">
                                    <div className="bg-slate-100 rounded-full overflow-hidden h-2">
                                        <div className="bg-cyan-500 h-2" style={{ width: `${progressPercentage}%` }}></div>
                                    </div>
                                    <div className="ring-cyan-500 ring-2 absolute top-1/2 w-4 h-4 flex items-center justify-center bg-white rounded-full shadow" style={{ left: `${progressPercentage}%`, transform: 'translateX(-50%) translateY(-50%)', }} >
                                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm font-medium tabular-nums">
                                    <div className="text-slate-500">{formatDuration(duration)}</div>
                                    <div className="text-cyan-500">{formatDuration(currentTime)}</div>
                                </div>
                            </div>
                        </div>
                        <div className=" text-white transition-all duration-500 rounded-b-xl flex items-center">
                            <div className="flex-auto flex items-center justify-evenly">
                                {/* favorite music */}
                                <button type="button" aria-label="Add to favorites" onClick={() => dispatch(addFavoriteMusic(currentAudio))} >
                                            <svg width="24" height="24">
                                                <path d="M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z" fill={`${findMusicLiked ? 'currentColor' : 'none'}`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                </button>
                                <button type="button" className="hidden sm:block lg:hidden xl:block" aria-label="Next" onClick={nextMusicHandler}>
                                    <svg width="24" height="24" fill="none">
                                        <path d="M14 12 6 6v12l8-6Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M18 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </button>
                                <button type="button" aria-label="Rewind 10 seconds" onClick={handleRewind10}>
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
                                <button type="button" aria-label="Skip 10 seconds" onClick={handleSkip10}>
                                    <svg width="24" height="24" fill="none">
                                        <path d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M19 5v3.111c0 .491-.398.889-.889.889H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </button>

                                <button type="button" className="hidden sm:block lg:hidden xl:block" aria-label="Previous" onClick={prevMusicHandler}>
                                    <svg width="24" height="24" fill="none">
                                        <path d="m10 12 8-6v12l-8-6Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M6 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </button>
                                <button type="button" className="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-white text-white transition-all duration-500 ">
                                    1x
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/6 flex justify-center items-center h-36">
                        <input className="w-fit md:flex hidden" type="range" id="volume" min="0" max="1" step="0.01" value={volume} onChange={changeVolumeHandler} />
                        <span className="text-white px-2">{Math.round(volume * 100)}</span>
                    </div>
                </div>
            }
            {/* music controll for mobile */}
            {
                !minusMusic &&

                <div className="md:hidden flex flex-col items-start px-2 gap-5 mt-20">
                    {currentAudio && (
                        <img src={currentAudio.cover_url} loading="lazy" decoding="async" alt="" className="size-full rounded-lg bg-slate-100 object-cover" />
                    )}
                    <div className="relative w-full">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-slate-200 transition-all duration-500 text-sm leading-6 truncate">
                                    {currentAudio ? currentAudio.albumTitle : "-"}
                                </h2>
                                <p className="text-slate-200 transition-all duration-500 text-lg">
                                    {currentAudio ? currentAudio.artistName : "-"}
                                </p>
                            </div>
                            <div className=" text-white transition-all duration-500 rounded-b-xl flex items-center gap-5">
                                <div className="flex-auto flex items-center justify-end">
                                    <button type="button" className="text-primary" aria-label="Next" onClick={nextMusicHandler}>
                                        <svg width="24" height="24" fill="none">
                                            <path d="M14 12 6 6v12l8-6Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M18 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    className="size-12 text-primary transition-all duration-500 flex-none -my-2 mx-auto rounded-full shadow-md flex items-center justify-center"
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
                                <div className="flex-auto flex items-center justify-start">
                                    <button type="button" className="text-primary" aria-label="Previous" onClick={prevMusicHandler}>
                                        <svg width="24" height="24" fill="none">
                                            <path d="m10 12 8-6v12l-8-6Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M6 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="flex size-10 justify-center items-center">
                                <div className="hover:cursor-pointer relative group" onClick={() => setShowSound(!showSound)} >
                                    <Sound />
                                    {
                                        showSound && (
                                            <input
                                                className="w-fit transform rotate-90 absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-200 group-hover:bottom-5 group-hover:mb-2"
                                                type="range"
                                                id="volume"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={volume}
                                                onChange={changeVolumeHandler}
                                            />
                                        )
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="border-slate-100 transition-all duration-500 border-b rounded-t-xl py-4 pb-6 ">
                            <div className="space-y-2">
                                <div dir="ltr" ref={timelineMobileRef} onClick={e => handleSeek(e, true)} className="relative cursor-pointer">
                                    <div className="bg-pink-800 rounded-full overflow-hidden h-2">
                                        <div className="bg-primary h-2" style={{ width: `${progressPercentage}%` }}></div>
                                    </div>
                                    <div className="ring-primary ring-2 absolute top-1/2 w-4 h-4 flex items-center justify-center bg-white rounded-full shadow" style={{ left: `${progressPercentage}%`, transform: 'translateX(-50%) translateY(-50%)', }} >
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full ring-1 ring-inset ring-primary"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm font-medium tabular-nums">
                                    <div className="text-slate-500">{formatDuration(duration)}</div>
                                    <div className="text-cyan-500">{formatDuration(currentTime)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* minus music controll */}
            {
                minusMusic && <div className="fixed bottom-20 lg:left-86 left-0 lg:right-10 right-0 mx-auto flex justify-between items-start px-2 pl-5 bg-bgplayercontroll ">
                    <div className="w-1/6 cursor-pointer" onClick={minusHandle}>
                        <div className="flex items-center space-x-4 gap-3">
                            {currentAudio && (
                                <img src={currentAudio.cover_url} loading="lazy" decoding="async" alt="" className="flex-none rounded-lg bg-slate-100 object-cover" width="55" height="50" />
                            )}
                            <div className="min-w-0 flex-auto space-y-1 font-semibold">
                                <p className="text-slate-200 transition-all duration-500 md:text-lg min-w-52 text-xs">
                                    {currentAudio ? currentAudio.artistName : "-"}
                                </p>
                                <h2 className="text-slate-200 transition-all duration-500 md:text-sm leading-1 min-w-52 text-xs">
                                    {currentAudio ? currentAudio.title : "-"}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="w-4/6 flex flex-col gap-2 relative z-10 ">
                        <div className=" text-white transition-all duration-500 rounded-b-xl flex items-center ">
                            <div className="flex-auto flex items-center justify-end">
                                <button type="button" className="flex " aria-label="Next" onClick={nextMusicHandler}>
                                    <svg width="24" height="24" fill="none">
                                        <path d="M14 12 6 6v12l8-6Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M18 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </button>
                            </div>
                            <button
                                type="button"
                                className="bg-white text-slate-900 transition-all duration-500 flex-none size-11 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center mx-5"
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
                            <div className="flex-none items-center justify-end ml-24">
                                <button type="button" className="flex" aria-label="Previous" onClick={prevMusicHandler}>
                                    <svg width="24" height="24" fill="none">
                                        <path d="m10 12 8-6v12l-8-6Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M6 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </button>
                            </div>
                            <CloseBtn buttonHandler={buttonHandler} />
                        </div>
                        {/* timelong */}
                        <div className="transition-all duration-500 rounded-t-xl">
                            <div dir="ltr" ref={timelineDesktopRef} onClick={e => handleSeek(e, false)} className="relative cursor-pointer">
                                <div className="bg-slate-100 rounded-full overflow-hidden h-1">
                                    <div className="bg-cyan-500 h-2" style={{ width: `${progressPercentage}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }


            <audio ref={audioRef} />
        </div >
    );
}
