import { memo, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { formatDuration } from "~/utils/formatDuration";
import ListMusicOfAlbum from "./ListMusicOfAlbum";
import ButtonMusic from "~/utils/ButtonMusic";

function DetailTrack({ track }) {

    const words = track?.title?.split(" ") || [];
    const lastIndex = words.length > 0 ? words[words.length - 1] : "";
    const firstIndex = words.slice(0, words.length - 1).join(" ");
    // const location=useLocation()
    // const [state,setState]=useState(document.documentElement.getAttribute("data-theme"))
    const durations = track?.tracks?.map(item => item.duration) || [];
    const sumDurationMusics = durations.reduce((a, b) => a + b, 0);
    // useEffect(() => {
    //     const themeAttr = document.documentElement.getAttribute("data-theme");
    //     setState(themeAttr);  // به روز رسانی state بر اساس تم

    //     // اگر در مسیر آلبوم و تم لایت هستیم، پس‌زمینه گرادیانت اعمال می‌شود
    //     if (location.pathname.includes("album") && themeAttr === "light") {
    //         document.documentElement.style.setProperty(
    //             '--bgbody', 
    //             'linear-gradient(to right, #0E9EEF, #053754)'
    //         );
    //     } else {
    //         document.documentElement.style.setProperty('--bgbody', 'white');
    //     }
    // }, [location.pathname, state]);
    

    return (
        <div className="flex flex-col">
            <div className="flex gap-10 mt-36 ">
                <img src={track?.cover_url} className="w-80" alt="" />
                <div className="flex flex-col justify-between gap-10">
                    <h1 className="text-primarytxt text-4xl">
                        {firstIndex} <span className="text-primary text-4xl">{lastIndex}</span>
                    </h1>
                    <span className="text-primarytxt text-sm">{track?.description}</span>
                    <div>
                        <div className="flex justify-between items-center gap-10">
                            <div className="flex gap-5">
                                <span className="text-primarytxt">{track?.tracks?.length || 0} اهنگ</span>
                                <span className="text-primarytxt">{formatDuration(sumDurationMusics)} دقیقه</span>
                            </div>
                            <ButtonMusic track={track.tracks[0].id} />
                        </div>
                    </div>
                </div>
            </div>
            <ListMusicOfAlbum tracks={track?.tracks} />
        </div>
    );
}

export default memo(DetailTrack);
