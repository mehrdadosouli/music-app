import { memo, useEffect, useState } from "react";
import { formatDuration } from "~/utils/formatDuration";
import ListMusicOfAlbum from "./ListMusicOfAlbum";
import ButtonMusic from "~/utils/ButtonMusic";
import { useSelector } from "react-redux";
import PlayerControll from "./PlayerControll/PlayerControll";

function DetailTrack({ track }) {
    const { isPlaying } = useSelector((state) => state.songs);
    const [isPlayerMounted, setIsPlayerMounted] = useState(false)
    const [isPlayerVisible, setIsPlayeVisible] = useState(false)
    const words = track?.title?.split(" ") || [];
    const lastIndex = words.length > 0 ? words[words.length - 1] : "";
    const firstIndex = words.slice(0, words.length - 1).join(" ");
    const durations = track?.tracks?.map(item => item.duration) || [];
    const sumDurationMusics = durations.reduce((a, b) => a + b, 0);

    useEffect(() => {
        if (isPlaying) {
            setIsPlayerMounted(true)
            setTimeout(() => {
                setIsPlayeVisible(true)
            }, 10);
        } else {
            setIsPlayeVisible(false)
            setTimeout(() => {
                setIsPlayerMounted(false)
            }, 500);
        }
    }, [isPlaying])
    return (
        <div className="flex flex-col">
            <div className="flex gap-10 mt-36 ">
                <img src={track?.cover_url} className="size-72 rounded-xl shadow-black shadow-bottom object-cover" alt="" />
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
            {isPlayerMounted && <PlayerControll track={track} open={isPlayerVisible} />}
            {!isPlayerMounted && <ListMusicOfAlbum tracks={track?.tracks} />}
        </div>
    );
}

export default memo(DetailTrack);
