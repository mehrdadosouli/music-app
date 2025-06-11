import { memo, useEffect, useState } from "react";
import { formatDuration } from "~/utils/formatDuration";

function DetailTrack({ track }) {
    const words = track?.title?.split(" ") || [];
    const lastIndex = words.length > 0 ? words[words.length - 1] : "";
    const firstIndex = words.slice(0, words.length - 1).join(" ");
    const [theme, setTheme] = useState(() =>
        document.documentElement.getAttribute("data-theme")
    );
    const durations = track?.tracks?.map(item => item.duration) || [];
    const sumDurationMusics = durations.reduce((a, b) => a + b, 0);
    console.log(sumDurationMusics / 60);
    useEffect(() => {
    // وقتی کامپوننت mount شد، کلاس bg-track رو به body اضافه کن
    document.body.classList.add("bg-track");

    // وقتی کامپوننت unmount شد، کلاس رو حذف کن
    return () => {
      document.body.classList.remove("bg-track");
    };
  }, []);
    return (
        <div className="flex gap-10 mt-36 ">
            <img src={track?.cover_url} className="w-80" alt="" />
            <div className="flex flex-col justify-between gap-10">
                <h1 className="text-primarytxt text-4xl">
                    {firstIndex} <span className="text-primary text-4xl">{lastIndex}</span>
                </h1>
                <span className="text-primarytxt text-sm">{track?.description}</span>
                <div>
                    <div className="flex gap-10">
                        <span className="text-primarytxt">{track?.tracks?.length || 0} اهنگ</span>
                        <span className="text-primarytxt">{formatDuration(sumDurationMusics)} ساعت</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(DetailTrack);
