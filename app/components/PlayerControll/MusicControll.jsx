import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pauseAudio, playAudio } from "~/redux/features/music/musicSlice";
import { formatDuration } from "~/utils/formatDuration";

export default function MusicControll() {
    const dispatch = useDispatch();
    const audioRef = useRef(null);
    const { isPlaying, currentAudio, track } = useSelector((state) => state.songs);
    const [currentTime, setCurrentTime] = useState(null)

    useEffect(() => {
        if (currentAudio) {
            audioRef.current.src = `/music/${currentAudio.id}.mp3`; // آدرس آهنگ 

            // وقتی آهنگ جدیدی انتخاب می‌شود، بلافاصله آن را پخش می‌کنیم.
            audioRef.current.play().catch(error => {
                console.error("Autoplay was prevented:", error);
                dispatch(pauseAudio());
            });
        }
    }, [currentAudio, dispatch]); // <-- فقط به currentAudio وابسته است

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play().catch(error => {
                // این خطا ممکن است در بارگذاری اولیه هم رخ دهد
                console.error("Play failed:", error);
                dispatch(pauseAudio());
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, dispatch]); // <-- فقط به isPlaying وابسته است

    useEffect(() => {
        const audio = audioRef.current
        const updateTime = () => {
            setCurrentTime(audioRef.current.currentTime)
        }
        audio.addEventListener("timeupdate", updateTime)
        return () => {
            audio.removeEventListener("timeupdate", updateTime)
        }
    }, [])

    // تابع برای دکمه اصلی Play/Pause
    const handlePlayPause = () => {
        if (isPlaying) {
            dispatch(pauseAudio());
        } else {
            // فقط در صورتی که آهنگی برای پخش وجود دارد
            if (currentAudio) {
                dispatch(playAudio(currentAudio));
            }
        }
    }
    console.log(track.tracks);


    return (
        <div className="flex items-start">
            {/* info music */}
            <div className="w-1/6">
                <div className="flex items-center space-x-4">
                    <img src="https://tailwindcss.com/_next/static/media/full-stack-radio.afb14e4e.png" loading="lazy" decoding="async" alt="" className="flex-none rounded-lg bg-slate-100" width="88" height="88" />
                    <div className="min-w-0 flex-auto space-y-1 font-semibold">
                        <p className="text-cyan-500 transition-all duration-500 text-sm leading-6">
                            <abbr title="Episode">Ep.</abbr> 128
                        </p>
                        <h2 className="text-slate-500 transition-all duration-500 text-sm leading-6 truncate">
                            Scaling CSS at Heroku with Utility ClassNamees
                        </h2>
                        <p className="text-slate-900 transition-all duration-500 text-lg">
                            Full Stack Radio
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-4/6 relative z-10 ">
                <div className="border-slate-100 transition-all duration-500 border-b rounded-t-xl p-4 pb-6 ">
                    {/* time range  */}
                    <div className="space-y-2">
                        <div className="relative">
                            <div className="bg-slate-100 transition-all duration-500 rounded-full overflow-hidden">
                                <div className="bg-cyan-500 transition-all duration-500 w-1/2 h-2" role="progressbar"
                                    aria-label="music progress" aria-valuenow="1456" aria-valuemin="0" aria-valuemax="4550"></div>
                            </div>
                            <div
                                className="ring-cyan-500 transition-all duration-500 ring-2 absolute left-1/2 top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow">
                                <div
                                    className="w-1.5 h-1.5 bg-cyan-500 transition-all duration-500 rounded-full ring-1 ring-inset ring-slate-900/5">
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
                            <div className="text-cyan-500 transition-all duration-500">{currentAudio.duration ? formatDuration(currentTime) : "0:00"}</div>
                            <div className="text-slate-500 transition-all duration-500">{formatDuration(currentAudio.duration)}</div>
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
                        <button type="button" className="hidden sm:block lg:hidden xl:block" aria-label="Previous">
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
                        onClick={handlePlayPause} // Add the click handler here
                    >
                        {/* SVG changes based on isPlaying state */}
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
                        <button type="button" className="hidden sm:block lg:hidden xl:block" aria-label="Next">
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
            {/* <div className="w-1/6 flex justify-center items-center h-36" ref={inputRef}>
                <input type="range" id="volume" min="0" max="1" step="0.01" />
            </div> */}
            <audio ref={audioRef} />
        </div>
    )
}